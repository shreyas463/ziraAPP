// src/app/layout.tsx
import '../styles/globals.css' // Adjust the path to your globals.css
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ticket Management App',
  description: 'An app to manage tickets with priority',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
