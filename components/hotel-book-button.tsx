'use client'

import { ExternalLink } from 'lucide-react'

const TIDES_URL = 'https://www.foratravel.com/advisor/eric-mcdearman'

export default function HotelBookButton({ hotelName }: { hotelName: string }) {
  function handleClick() {
    // Fire-and-forget — don't block navigation
    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: 'hotel_click',
        payload: { hotel_name: hotelName },
      }),
    }).catch(() => {})
  }

  return (
    <a
      href={TIDES_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="w-full inline-flex items-center justify-center bg-[#D6C6A5] text-[#0E1A2B] font-semibold hover:bg-[#c4b48f] transition-colors rounded-full px-4 py-2 text-sm"
    >
      Book with Tides &amp; Timbers
      <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
    </a>
  )
}
