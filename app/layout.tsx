import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: 'ERP mini — Ethiopian SME management',
  description: 'Simple sales, inventory, staff and catalog management for Ethiopian SMEs.',
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
  themeColor: '#0000FF',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="am" className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
