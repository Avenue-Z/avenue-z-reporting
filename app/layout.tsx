import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Avenue Z — Reporting Platform',
  description: 'Multi-client marketing reporting powered by Supermetrics',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-glow">{children}</body>
    </html>
  )
}
