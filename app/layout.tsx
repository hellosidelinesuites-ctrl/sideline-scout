import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Playfair_Display } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sideline Scout — Tournament Weekend. Locked In.',
  description:
    'AI-powered travel guide for youth sports tournament families. Hotels, gear, food, parking, and more — all in one place.',
  openGraph: {
    title: 'Sideline Scout — Tournament Weekend. Locked In.',
    description: 'Tournament weekend. Locked in.',
    siteName: 'Sideline Scout',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  )
}
