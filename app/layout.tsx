import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Roboto } from 'next/font/google'
import NavBar from "@/components/shared/NavBar";
import Footer from '@/components/shared/Footer';
import './globals.css'
import AuthContext from '@/context/AuthContext';
import getCurrentUser from './actions/getCurrentUser';
import { EdgeStoreProvider } from '@/lib/edgestore';

const roboto = Roboto({ subsets: ['latin'], weight: ["100","400","700","900"] })

export const metadata: Metadata = {
  title: 'Travel Blog',
  description: 'Travel Blog next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  return (
    <html lang="en">
      <AuthContext>
        <EdgeStoreProvider>
          <body className={`${roboto.className} overflow-x-hidden bg-top`}>
            <NavBar user={user as any} />
            {children}
            <Footer />
          </body>
        </EdgeStoreProvider>
      </AuthContext>
    </html>
  )
}
