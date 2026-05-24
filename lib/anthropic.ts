import Anthropic from '@anthropic-ai/sdk'

let _client: Anthropic | null = null

export function getAnthropicClient(): Anthropic {
  if (!_client) {
    _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
  }
  return _client
}

export const SCOUT_MODEL = 'claude-sonnet-4-20250514'

export const SCOUT_SYSTEM_PROMPT = `You are Scout, an AI travel concierge for youth sports tournament families. You help parents plan their tournament weekend with confidence.

You ONLY answer questions using the tournament data provided to you in each message. Do not invent, guess, or supplement with general knowledge. If the data doesn't cover something, say so clearly and suggest they check with the tournament organizer.

Be warm, practical, and concise. Parents are busy. Lead with the most useful information first.

When recommending hotels, always mention distance from the venue and price. When discussing food, mention if it's good for kids. When discussing parking or tents, be specific about location and timing.`

// Intent categories for routing DB queries
export type ScoutIntent =
  | 'hotels'
  | 'restaurants'
  | 'parking'
  | 'tents'
  | 'gear'
  | 'weather'
  | 'airports'
  | 'grocery'
  | 'schedule'
  | 'general'

export function detectIntent(question: string): ScoutIntent {
  const q = question.toLowerCase()
  if (/hotel|stay|lodg|airbnb|motel|sleep/.test(q)) return 'hotels'
  if (/food|eat|restaur|lunch|dinner|breakfast|coffee|snack/.test(q)) return 'restaurants'
  if (/park|lot|garage|where to park/.test(q)) return 'parking'
  if (/tent|canopy|shade|setup|tailgat/.test(q)) return 'tents'
  if (/gear|equipment|chair|cooler|wagon|rent/.test(q)) return 'gear'
  if (/weather|rain|hot|cold|temp|forecast/.test(q)) return 'weather'
  if (/airport|fly|flight|fly in|drive|travel/.test(q)) return 'airports'
  if (/grocer|walmart|target|costco|supplies|water/.test(q)) return 'grocery'
  if (/schedule|game|time|bracket|field|when/.test(q)) return 'schedule'
  return 'general'
}
