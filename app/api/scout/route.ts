import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getAnthropicClient, SCOUT_MODEL, SCOUT_SYSTEM_PROMPT, detectIntent } from '@/lib/anthropic'

export async function POST(req: NextRequest) {
  const { slug, question, history = [] } = await req.json()

  if (!slug || !question) {
    return NextResponse.json({ error: 'Missing slug or question' }, { status: 400 })
  }

  const start = Date.now()
  const supabase = await createClient()

  // Load tournament
  const { data: tournament } = await supabase
    .from('tournaments')
    .select('id, name, organizer, sport, start_date, end_date, venues(name, address, city, state)')
    .eq('slug', slug)
    .single()

  if (!tournament) {
    return NextResponse.json({ error: 'Tournament not found' }, { status: 404 })
  }

  const intent = detectIntent(question)

  // Fetch relevant data based on intent
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const venue = (tournament.venues as any) as { name: string; city: string; state: string } | null
  const contextParts: string[] = [
    `Tournament: ${tournament.name} (${tournament.organizer})`,
    `Sport: ${tournament.sport}`,
    `Dates: ${tournament.start_date} – ${tournament.end_date}`,
    `Venue: ${venue?.name ?? ''}, ${venue?.city ?? ''}, ${venue?.state ?? ''}`,
  ]

  if (intent === 'hotels' || intent === 'general') {
    const { data: hotels } = await supabase
      .from('hotels')
      .select('name, distance_miles, price_per_night, star_rating, amenities, is_team_friendly, notes, booking_url')
      .eq('tournament_id', tournament.id)
      .order('distance_miles')
      .limit(8)
    if (hotels?.length) {
      contextParts.push('\nHotels:\n' + hotels.map(h =>
        `- ${h.name}: ${h.distance_miles}mi away, $${h.price_per_night}/night${h.is_team_friendly ? ' (team-friendly)' : ''}${h.notes ? ' — ' + h.notes : ''}`
      ).join('\n'))
    }
  }

  if (intent === 'restaurants' || intent === 'general') {
    const { data: restaurants } = await supabase
      .from('restaurants')
      .select('name, cuisine, distance_miles, price_level, tags, google_maps_url, notes')
      .eq('tournament_id', tournament.id)
      .order('distance_miles')
      .limit(8)
    if (restaurants?.length) {
      contextParts.push('\nRestaurants:\n' + restaurants.map(r =>
        `- ${r.name}${r.cuisine ? ' (' + r.cuisine + ')' : ''}: ${r.distance_miles}mi, ${'$'.repeat(r.price_level)}${r.google_maps_url ? ' [Directions](' + r.google_maps_url + ')' : ''}${r.notes ? ' — ' + r.notes : ''}`
      ).join('\n'))
    }
  }

  if (intent === 'parking') {
    const { data: tips } = await supabase
      .from('parking_tips')
      .select('tip, lot_name, source')
      .eq('tournament_id', tournament.id)
    if (tips?.length) {
      contextParts.push('\nParking Tips:\n' + tips.map(t =>
        `- ${t.lot_name ? t.lot_name + ': ' : ''}${t.tip} (source: ${t.source})`
      ).join('\n'))
    }
  }

  if (intent === 'tents') {
    const { data: tips } = await supabase
      .from('tent_tips')
      .select('tip, category, source')
      .eq('tournament_id', tournament.id)
    if (tips?.length) {
      contextParts.push('\nTent/Canopy Tips:\n' + tips.map(t =>
        `- ${t.tip} (source: ${t.source})`
      ).join('\n'))
    }
  }

  if (intent === 'gear') {
    const { data: listings } = await supabase
      .from('gear_listings')
      .select('title, category, price_per_day, quantity_available')
      .eq('tournament_id', tournament.id)
      .eq('is_available', true)
    if (listings?.length) {
      contextParts.push('\nGear Available for Rent:\n' + listings.map(g =>
        `- ${g.title} (${g.category}): $${g.price_per_day}/day, ${g.quantity_available} available`
      ).join('\n'))
    }
  }

  if (intent === 'weather') {
    const { data: weather } = await supabase
      .from('weather')
      .select('forecast_date, high_f, low_f, condition, precip_chance')
      .eq('tournament_id', tournament.id)
      .order('forecast_date')
    if (weather?.length) {
      contextParts.push('\nWeather Forecast:\n' + weather.map(w =>
        `- ${w.forecast_date}: ${w.condition}, High ${w.high_f}°F / Low ${w.low_f}°F, ${w.precip_chance}% rain`
      ).join('\n'))
    }
  }

  if (intent === 'airports') {
    const { data: airports } = await supabase
      .from('airports')
      .select('code, name, distance_miles, drive_minutes, notes')
      .eq('tournament_id', tournament.id)
    if (airports?.length) {
      contextParts.push('\nNearby Airports:\n' + airports.map(a =>
        `- ${a.code} (${a.name}): ${a.distance_miles}mi, ~${a.drive_minutes}min drive${a.notes ? ' — ' + a.notes : ''}`
      ).join('\n'))
    }
  }

  if (intent === 'grocery') {
    const { data: stops } = await supabase
      .from('grocery_stops')
      .select('name, address, distance_miles, notes')
      .eq('tournament_id', tournament.id)
    if (stops?.length) {
      contextParts.push('\nGrocery Stops:\n' + stops.map(g =>
        `- ${g.name}: ${g.distance_miles}mi${g.notes ? ' — ' + g.notes : ''}`
      ).join('\n'))
    }
  }

  // Always include approved parent tips
  const { data: parentTips } = await supabase
    .from('parent_tips')
    .select('tip, category')
    .eq('tournament_id', tournament.id)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(20)

  const tipCount = parentTips?.length ?? 0
  if (tipCount > 0) {
    contextParts.push('\nParent Tips (verified by Sideline Scout):\n' + parentTips!.map(t =>
      `- ${t.category ? '[' + t.category + '] ' : ''}${t.tip}`
    ).join('\n'))
  }

  const contextBlock = contextParts.join('\n')

  // Build messages for Claude
  const messages = [
    ...history.slice(-8), // keep last 8 messages for context
    {
      role: 'user' as const,
      content: `<tournament_data>\n${contextBlock}\n</tournament_data>\n\nQuestion: ${question}`,
    },
  ]

  try {
    const response = await getAnthropicClient().messages.create({
      model: SCOUT_MODEL,
      max_tokens: 600,
      system: SCOUT_SYSTEM_PROMPT,
      messages,
    })

    const answer = response.content[0].type === 'text' ? response.content[0].text : ''
    const latency = Date.now() - start

    // Log to scout_queries (fire and forget)
    supabase.from('scout_queries').insert({
      tournament_id: tournament.id,
      question,
      intent,
      answer,
      latency_ms: latency,
    }).then(() => {})

    return NextResponse.json({ answer, intent, tipCount })
  } catch (err) {
    console.error('Scout API error:', err)
    return NextResponse.json({ error: 'Scout unavailable' }, { status: 500 })
  }
}
