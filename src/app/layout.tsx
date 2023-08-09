import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Uaiser',
  description: 'AI tool for your personal assistant',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={nunito.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
