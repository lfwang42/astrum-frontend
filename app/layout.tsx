import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Astrum',
  description: 'Created by AkoDako',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={inter.className} lang="en">
      <body className="h-screen bg-slate-700 text-slate-50">{children}</body>
    </html>
  )
}
