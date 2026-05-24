export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      tournaments: {
        Row: Tournament
        Insert: Omit<Tournament, 'id' | 'created_at'>
        Update: Partial<Omit<Tournament, 'id' | 'created_at'>>
      }
      venues: {
        Row: Venue
        Insert: Omit<Venue, 'id' | 'created_at'>
        Update: Partial<Omit<Venue, 'id' | 'created_at'>>
      }
      fields: {
        Row: Field
        Insert: Omit<Field, 'id'>
        Update: Partial<Omit<Field, 'id'>>
      }
      field_zones: {
        Row: FieldZone
        Insert: Omit<FieldZone, 'id'>
        Update: Partial<Omit<FieldZone, 'id'>>
      }
      hotels: {
        Row: Hotel
        Insert: Omit<Hotel, 'id' | 'created_at'>
        Update: Partial<Omit<Hotel, 'id' | 'created_at'>>
      }
      travel_deals: {
        Row: TravelDeal
        Insert: Omit<TravelDeal, 'id' | 'created_at'>
        Update: Partial<Omit<TravelDeal, 'id' | 'created_at'>>
      }
      restaurants: {
        Row: Restaurant
        Insert: Omit<Restaurant, 'id' | 'created_at'>
        Update: Partial<Omit<Restaurant, 'id' | 'created_at'>>
      }
      grocery_stops: {
        Row: GroceryStop
        Insert: Omit<GroceryStop, 'id'>
        Update: Partial<Omit<GroceryStop, 'id'>>
      }
      tent_tips: {
        Row: TentTip
        Insert: Omit<TentTip, 'id' | 'created_at'>
        Update: Partial<Omit<TentTip, 'id' | 'created_at'>>
      }
      parking_tips: {
        Row: ParkingTip
        Insert: Omit<ParkingTip, 'id' | 'created_at'>
        Update: Partial<Omit<ParkingTip, 'id' | 'created_at'>>
      }
      gear_scenarios: {
        Row: GearScenario
        Insert: Omit<GearScenario, 'id'>
        Update: Partial<Omit<GearScenario, 'id'>>
      }
      weather: {
        Row: Weather
        Insert: Omit<Weather, 'id' | 'fetched_at'>
        Update: Partial<Omit<Weather, 'id' | 'fetched_at'>>
      }
      airports: {
        Row: Airport
        Insert: Omit<Airport, 'id'>
        Update: Partial<Omit<Airport, 'id'>>
      }
      hosts: {
        Row: Host
        Insert: Omit<Host, 'id' | 'created_at'>
        Update: Partial<Omit<Host, 'id' | 'created_at'>>
      }
      gear_listings: {
        Row: GearListing
        Insert: Omit<GearListing, 'id' | 'created_at'>
        Update: Partial<Omit<GearListing, 'id' | 'created_at'>>
      }
      gear_reservations: {
        Row: GearReservation
        Insert: Omit<GearReservation, 'id' | 'created_at'>
        Update: Partial<Omit<GearReservation, 'id' | 'created_at'>>
      }
      packages: {
        Row: Package
        Insert: Omit<Package, 'id' | 'created_at'>
        Update: Partial<Omit<Package, 'id' | 'created_at'>>
      }
      scout_queries: {
        Row: ScoutQuery
        Insert: Omit<ScoutQuery, 'id' | 'created_at'>
        Update: Partial<Omit<ScoutQuery, 'id' | 'created_at'>>
      }
      scout_shares: {
        Row: ScoutShare
        Insert: Omit<ScoutShare, 'id' | 'created_at'>
        Update: Partial<Omit<ScoutShare, 'id' | 'created_at'>>
      }
      parent_tips: {
        Row: ParentTip
        Insert: Omit<ParentTip, 'id' | 'created_at'>
        Update: Partial<Omit<ParentTip, 'id' | 'created_at'>>
      }
      sessions: {
        Row: Session
        Insert: Omit<Session, 'id' | 'created_at'>
        Update: Partial<Omit<Session, 'id' | 'created_at'>>
      }
      page_views: {
        Row: PageView
        Insert: Omit<PageView, 'id' | 'created_at'>
        Update: Partial<Omit<PageView, 'id' | 'created_at'>>
      }
      events: {
        Row: AppEvent
        Insert: Omit<AppEvent, 'id' | 'created_at'>
        Update: Partial<Omit<AppEvent, 'id' | 'created_at'>>
      }
    }
  }
}

// ─── Core entities ───────────────────────────────────────────────

export interface Tournament {
  id: string
  slug: string
  name: string
  organizer: string
  sport: string
  start_date: string
  end_date: string
  venue_id: string
  description: string | null
  hero_image_url: string | null
  is_active: boolean
  created_at: string
}

export interface Venue {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  lat: number
  lng: number
  fields_count: number | null
  parking_notes: string | null
  created_at: string
}

export interface Field {
  id: string
  venue_id: string
  name: string
  surface: string | null
  notes: string | null
}

export interface FieldZone {
  id: string
  venue_id: string
  zone_name: string
  description: string | null
  coordinates: Json | null
}

// ─── Accommodation ───────────────────────────────────────────────

export interface Hotel {
  id: string
  tournament_id: string
  name: string
  address: string
  city: string
  state: string
  distance_miles: number
  price_per_night: number
  star_rating: number | null
  amenities: string[]
  booking_url: string | null
  affiliate_url: string | null
  image_url: string | null
  is_team_friendly: boolean
  notes: string | null
  created_at: string
}

export interface TravelDeal {
  id: string
  tournament_id: string
  provider: string
  deal_type: 'flight' | 'rental_car' | 'shuttle' | 'other'
  description: string
  url: string | null
  expires_at: string | null
  created_at: string
}

// ─── Local info ──────────────────────────────────────────────────

export interface Restaurant {
  id: string
  tournament_id: string
  name: string
  cuisine: string | null
  address: string
  distance_miles: number | null
  price_level: 1 | 2 | 3 | 4
  tags: string[]
  google_maps_url: string | null
  notes: string | null
  created_at: string
}

export interface GroceryStop {
  id: string
  tournament_id: string
  name: string
  address: string
  distance_miles: number | null
  notes: string | null
}

export interface TentTip {
  id: string
  tournament_id: string
  tip: string
  category: string | null
  source: 'staff' | 'parent' | 'organizer'
  created_at: string
}

export interface ParkingTip {
  id: string
  tournament_id: string
  tip: string
  lot_name: string | null
  source: 'staff' | 'parent' | 'organizer'
  created_at: string
}

export interface GearScenario {
  id: string
  tournament_id: string
  scenario: string
  recommended_gear: string[]
  notes: string | null
}

export interface Weather {
  id: string
  tournament_id: string
  forecast_date: string
  high_f: number | null
  low_f: number | null
  condition: string | null
  precip_chance: number | null
  fetched_at: string
}

export interface Airport {
  id: string
  tournament_id: string
  code: string
  name: string
  distance_miles: number
  drive_minutes: number | null
  notes: string | null
}

// ─── Hosts & Gear ────────────────────────────────────────────────

export interface Host {
  id: string
  name: string
  email: string
  phone: string | null
  tournament_id: string | null
  message: string | null
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

export interface GearListing {
  id: string
  host_id: string
  tournament_id: string
  title: string
  description: string | null
  category: string
  price_per_day: number
  quantity_available: number
  image_url: string | null
  is_available: boolean
  created_at: string
}

export interface GearReservation {
  id: string
  gear_listing_id: string
  renter_name: string
  renter_email: string
  start_date: string
  end_date: string
  days: number
  subtotal: number
  platform_fee: number
  setup_service: boolean
  gear_protection: boolean
  placement_intel: boolean
  total: number
  stripe_payment_intent_id: string | null
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  created_at: string
}

export interface Package {
  id: string
  tournament_id: string
  name: string
  description: string | null
  includes: string[]
  price: number
  stripe_price_id: string | null
  created_at: string
}

// ─── Scout AI ────────────────────────────────────────────────────

export interface ScoutQuery {
  id: string
  tournament_id: string
  session_id: string | null
  question: string
  intent: string | null
  answer: string
  sources: Json | null
  latency_ms: number | null
  created_at: string
}

export interface ScoutShare {
  id: string
  scout_query_id: string
  share_token: string
  created_at: string
}

// ─── Community ───────────────────────────────────────────────────

export interface ParentTip {
  id: string
  tournament_id: string
  tip: string
  category: string | null
  submitter_name: string | null
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

// ─── Analytics ───────────────────────────────────────────────────

export interface Session {
  id: string
  tournament_id: string | null
  user_agent: string | null
  ip_hash: string | null
  created_at: string
}

export interface PageView {
  id: string
  session_id: string | null
  tournament_id: string | null
  path: string
  referrer: string | null
  created_at: string
}

export interface AppEvent {
  id: string
  session_id: string | null
  tournament_id: string | null
  event_type: string
  payload: Json | null
  created_at: string
}

// ─── Upsell pricing constants ────────────────────────────────────

export const PLATFORM_FEE_RATE = 0.18
export const UPSELL_PRICES = {
  setup_service: 40,
  gear_protection: 10,
  placement_intel: 15,
} as const
