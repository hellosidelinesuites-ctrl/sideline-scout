-- Sideline Scout — Supabase schema
-- Run this in your Supabase SQL editor

-- Enable extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ─── Venues ─────────────────────────────────────────────────────
create table venues (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  address text not null,
  city text not null,
  state text not null,
  zip text not null,
  lat numeric(10,7) not null,
  lng numeric(10,7) not null,
  fields_count int,
  parking_notes text,
  created_at timestamptz default now()
);

-- ─── Tournaments ─────────────────────────────────────────────────
create table tournaments (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  organizer text not null,
  sport text not null,
  start_date date not null,
  end_date date not null,
  venue_id uuid references venues(id),
  description text,
  hero_image_url text,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- ─── Fields ──────────────────────────────────────────────────────
create table fields (
  id uuid primary key default uuid_generate_v4(),
  venue_id uuid references venues(id) on delete cascade,
  name text not null,
  surface text,
  notes text
);

create table field_zones (
  id uuid primary key default uuid_generate_v4(),
  venue_id uuid references venues(id) on delete cascade,
  zone_name text not null,
  description text,
  coordinates jsonb
);

-- ─── Hotels ──────────────────────────────────────────────────────
create table hotels (
  id uuid primary key default uuid_generate_v4(),
  tournament_id uuid references tournaments(id) on delete cascade,
  name text not null,
  address text not null,
  city text not null,
  state text not null,
  distance_miles numeric(5,2) not null,
  price_per_night numeric(8,2) not null,
  star_rating int check (star_rating between 1 and 5),
  amenities text[] default '{}',
  booking_url text,
  affiliate_url text,
  image_url text,
  is_team_friendly boolean default false,
  notes text,
  created_at timestamptz default now()
);

-- ─── Travel deals ────────────────────────────────────────────────
create table travel_deals (
  id uuid primary key default uuid_generate_v4(),
  tournament_id uuid references tournaments(id) on delete cascade,
  provider text not null,
  deal_type text not null check (deal_type in ('flight', 'rental_car', 'shuttle', 'other')),
  description text not null,
  url text,
  expires_at timestamptz,
  created_at timestamptz default now()
);

-- ─── Restaurants ─────────────────────────────────────────────────
create table restaurants (
  id uuid primary key default uuid_generate_v4(),
  tournament_id uuid references tournaments(id) on delete cascade,
  name text not null,
  cuisine text,
  address text not null,
  distance_miles numeric(5,2),
  price_level int check (price_level between 1 and 4),
  tags text[] default '{}',
  google_maps_url text,
  notes text,
  created_at timestamptz default now()
);

-- ─── Grocery stops ───────────────────────────────────────────────
create table grocery_stops (
  id uuid primary key default uuid_generate_v4(),
  tournament_id uuid references tournaments(id) on delete cascade,
  name text not null,
  address text not null,
  distance_miles numeric(5,2),
  notes text
);

-- ─── Tips ────────────────────────────────────────────────────────
create table tent_tips (
  id uuid primary key default uuid_generate_v4(),
  tournament_id uuid references tournaments(id) on delete cascade,
  tip text not null,
  category text,
  source text not null check (source in ('staff', 'parent', 'organizer')),
  created_at timestamptz default now()
);

create table parking_tips (
  id uuid primary key default uuid_generate_v4(),
  tournament_id uuid references tournaments(id) on delete cascade,
  tip text not null,
  lot_name text,
  source text not null check (source in ('staff', 'parent', 'organizer')),
  created_at timestamptz default now()
);

-- ─── Gear scenarios ──────────────────────────────────────────────
create table gear_scenarios (
  id uuid primary key default uuid_generate_v4(),
  tournament_id uuid references tournaments(id) on delete cascade,
  scenario text not null,
  recommended_gear text[] default '{}',
  notes text
);

-- ─── Weather ─────────────────────────────────────────────────────
create table weather (
  id uuid primary key default uuid_generate_v4(),
  tournament_id uuid references tournaments(id) on delete cascade,
  forecast_date date not null,
  high_f numeric(5,1),
  low_f numeric(5,1),
  condition text,
  precip_chance int,
  fetched_at timestamptz default now()
);

-- ─── Airports ────────────────────────────────────────────────────
create table airports (
  id uuid primary key default uuid_generate_v4(),
  tournament_id uuid references tournaments(id) on delete cascade,
  code text not null,
  name text not null,
  distance_miles numeric(5,1) not null,
  drive_minutes int,
  notes text
);

-- ─── Hosts ───────────────────────────────────────────────────────
create table hosts (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  tournament_id uuid references tournaments(id),
  message text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz default now()
);

-- ─── Gear listings & reservations ────────────────────────────────
create table gear_listings (
  id uuid primary key default uuid_generate_v4(),
  host_id uuid references hosts(id) on delete cascade,
  tournament_id uuid references tournaments(id) on delete cascade,
  title text not null,
  description text,
  category text not null,
  price_per_day numeric(8,2) not null,
  quantity_available int not null default 1,
  image_url text,
  is_available boolean default true,
  created_at timestamptz default now()
);

create table gear_reservations (
  id uuid primary key default uuid_generate_v4(),
  gear_listing_id uuid references gear_listings(id) on delete cascade,
  renter_name text not null,
  renter_email text not null,
  start_date date not null,
  end_date date not null,
  days int not null,
  subtotal numeric(8,2) not null,
  platform_fee numeric(8,2) not null,
  setup_service boolean default false,
  gear_protection boolean default false,
  placement_intel boolean default false,
  total numeric(8,2) not null,
  stripe_payment_intent_id text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at timestamptz default now()
);

-- ─── Packages ────────────────────────────────────────────────────
create table packages (
  id uuid primary key default uuid_generate_v4(),
  tournament_id uuid references tournaments(id) on delete cascade,
  name text not null,
  description text,
  includes text[] default '{}',
  price numeric(8,2) not null,
  stripe_price_id text,
  created_at timestamptz default now()
);

-- ─── Scout AI ────────────────────────────────────────────────────
create table scout_queries (
  id uuid primary key default uuid_generate_v4(),
  tournament_id uuid references tournaments(id),
  session_id uuid,
  question text not null,
  intent text,
  answer text not null,
  sources jsonb,
  latency_ms int,
  created_at timestamptz default now()
);

create table scout_shares (
  id uuid primary key default uuid_generate_v4(),
  scout_query_id uuid references scout_queries(id) on delete cascade,
  share_token text unique not null default encode(gen_random_bytes(8), 'hex'),
  created_at timestamptz default now()
);

-- ─── Community ───────────────────────────────────────────────────
create table parent_tips (
  id uuid primary key default uuid_generate_v4(),
  tournament_id uuid references tournaments(id) on delete cascade,
  tip text not null,
  category text,
  submitter_name text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz default now()
);

-- ─── Analytics ───────────────────────────────────────────────────
create table sessions (
  id uuid primary key default uuid_generate_v4(),
  tournament_id uuid references tournaments(id),
  user_agent text,
  ip_hash text,
  created_at timestamptz default now()
);

create table page_views (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid references sessions(id),
  tournament_id uuid references tournaments(id),
  path text not null,
  referrer text,
  created_at timestamptz default now()
);

create table events (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid references sessions(id),
  tournament_id uuid references tournaments(id),
  event_type text not null,
  payload jsonb,
  created_at timestamptz default now()
);

-- ─── Seed: West Coast Showdown 2026 ─────────────────────────────
insert into venues (id, name, address, city, state, zip, lat, lng, fields_count)
values (
  'a1b2c3d4-0000-0000-0000-000000000001',
  'Twin Creeks Sports Complex',
  '1225 Caribbean Dr',
  'Sunnyvale',
  'CA',
  '94089',
  37.4080,
  -122.0150,
  12
);

insert into tournaments (slug, name, organizer, sport, start_date, end_date, venue_id)
values (
  'west-coast-showdown-2026',
  'West Coast Showdown',
  'ADVNC Lacrosse',
  'Lacrosse',
  '2026-07-18',
  '2026-07-19',
  'a1b2c3d4-0000-0000-0000-000000000001'
);

-- ─── Seed: Restaurants (West Coast Showdown 2026) ────────────────
insert into restaurants (tournament_id, name, cuisine, address, distance_miles, price_level, tags, google_maps_url, notes)
select
  t.id,
  r.name,
  r.cuisine,
  r.address,
  r.distance_miles,
  r.price_level,
  r.tags,
  r.google_maps_url,
  r.notes
from tournaments t,
(values
  (
    'Lazy Dog Restaurant & Bar',
    'American',
    '310 Persian Dr, Sunnyvale, CA 94089',
    1.2,
    2,
    array['kid-friendly','group-friendly','full-bar','sports-tv'],
    'https://maps.google.com/?q=Lazy+Dog+Restaurant+Bar+310+Persian+Dr+Sunnyvale+CA',
    'Great for big groups after games. Spacious booths, kids menu, and they can handle teams. OpenTable reservations strongly recommended on weekends — [Reserve on OpenTable](https://www.opentable.com/lazy-dog-restaurant-and-bar-sunnyvale)'
  ),
  (
    'Pacific Catch',
    'Seafood',
    '339 N Mathilda Ave, Sunnyvale, CA 94085',
    1.8,
    2,
    array['kid-friendly','healthy','gluten-free-options','patio'],
    'https://maps.google.com/?q=Pacific+Catch+339+N+Mathilda+Ave+Sunnyvale+CA',
    'Fresh fish tacos, bowls, and salads — good lighter option between games. [Reserve on OpenTable](https://www.opentable.com/pacific-catch-sunnyvale)'
  ),
  (
    'BJ''s Restaurant & Brewhouse',
    'American',
    '170 W McKinley Ave, Sunnyvale, CA 94086',
    2.1,
    2,
    array['kid-friendly','group-friendly','full-bar','late-night','sports-tv'],
    'https://maps.google.com/?q=BJs+Restaurant+Brewhouse+170+W+McKinley+Ave+Sunnyvale+CA',
    'Reliable crowd-pleaser for families and teams. Deep dish pizza, Pizookie dessert, huge menu. [Reserve on OpenTable](https://www.opentable.com/bjs-restaurant-and-brewhouse-sunnyvale)'
  ),
  (
    'Eureka! Sunnyvale',
    'American',
    '150 W McKinley Ave, Sunnyvale, CA 94086',
    2.2,
    2,
    array['burgers','craft-beer','kid-friendly'],
    'https://maps.google.com/?q=Eureka+Sunnyvale+150+W+McKinley+Ave',
    'Upscale burgers and craft beer. Good post-tournament dinner spot.'
  ),
  (
    'Pho Hoa Hiep',
    'Vietnamese',
    '1046 E El Camino Real, Sunnyvale, CA 94087',
    2.5,
    1,
    array['fast','cheap','noodles','healthy'],
    'https://maps.google.com/?q=Pho+Hoa+Hiep+1046+E+El+Camino+Real+Sunnyvale+CA',
    'Best quick meal between games. Large portions, fast service, very affordable.'
  ),
  (
    'Chipotle Mexican Grill',
    'Mexican',
    '1300 W El Camino Real, Sunnyvale, CA 94087',
    1.5,
    1,
    array['fast','customizable','kid-friendly','gluten-free-options'],
    'https://maps.google.com/?q=Chipotle+1300+W+El+Camino+Real+Sunnyvale+CA',
    'Reliable fast-casual. Good for feeding a team quickly between sessions.'
  ),
  (
    'Starbucks (Twin Creeks)',
    'Coffee',
    '1185 Reamwood Ave, Sunnyvale, CA 94089',
    0.4,
    1,
    array['coffee','breakfast','quick','closest'],
    'https://maps.google.com/?q=Starbucks+1185+Reamwood+Ave+Sunnyvale+CA',
    'Closest coffee to the complex. Opens at 5am on weekends — great for early game days.'
  )
) as r(name, cuisine, address, distance_miles, price_level, tags, google_maps_url, notes)
where t.slug = 'west-coast-showdown-2026';
