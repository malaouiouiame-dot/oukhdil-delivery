import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Oukhdil Delivery | Livraison rapide à Marrakech',
  description: 'Oukhdil Delivery : repas, pharmacie, gâteaux, factures et courses livrés rapidement à Marrakech à partir de 20 DH.',
  generator: 'Oukhdil Delivery',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#092856',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="bg-[#f5f8fc]">
      <body className={`${inter.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
