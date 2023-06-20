import './globals.css'
import { Inter } from 'next/font/google'
import Header from './header'
import DarkModeToggle from './DarkModeToggles'

import '@/styles/globals.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Portfolio 2023',
  description: 'Portfolio de Luca Ciampi',
}

interface Props {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Header />
        <DarkModeToggle />
        {children}
      </body>
    </html>
  )
}
