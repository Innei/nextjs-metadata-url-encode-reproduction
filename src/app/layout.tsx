import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const generateMetadata = async (): Promise<Metadata> => {
  const ogUrl = new URL('http://localhost:3000/og.png')

  ogUrl.searchParams.set('title', 'Nextjs')
  ogUrl.searchParams.set('description', 'description - Nextjs')

  return {
    title: 'Nextjs',
    openGraph: {
      images: ogUrl,
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
