import { createBrowserClient } from '@supabase/ssr'

// Types are defined in @/types/database — use the entity interfaces directly in queries.
// Run `supabase gen types` once you have a live project to replace with generated types.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
