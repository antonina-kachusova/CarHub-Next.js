import './globals.css'
import type { Metadata } from 'next'
import { Footer, Navbar } from '@/components'

export const metadata: Metadata = {
  title: 'Car Hub',
  description: 'Find, book, rent a car—quick and super easy!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='relative'>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
