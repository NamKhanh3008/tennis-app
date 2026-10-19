import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { TennisAppState } from '@/components/tennis-app-state'
import './globals.css'

export const metadata: Metadata = {
  title: 'CMU Tennis — Find your next tennis partner',
  description: 'Meet tennis players across Carnegie Mellon, find a hitting partner, and get out on court.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f5f7f5',
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="antialiased">
        <TennisAppState>{children}</TennisAppState>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
