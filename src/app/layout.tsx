import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import UpgradeToProModal from '@/components/UpgradeToProModal'
import AlertModal from '@/components/AlertModal'
import ChatBox from '@/components/ChatBox'

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
        <ChatBox />
        <body className={nunito.className}>
          <UpgradeToProModal />
          <AlertModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
};