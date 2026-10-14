import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: 'Beyond Solution RMS - Luwak Coffee Addis Ababa',
  description: 'Restaurant Management System for Luwak Coffee Addis Ababa',
  generator: 'v0.app',
  icons: {
    icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20favicon_-t3xF2fbG6rg78cdX1BNNYJPkOKNYSn.png',
    apple: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20favicon_-t3xF2fbG6rg78cdX1BNNYJPkOKNYSn.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#3E2723',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
