import './globals.css'
import { Playfair_Display, Abril_Fatface } from 'next/font/google'
import Header from './header'
import DarkModeToggle from '../components/DarkModeToggle'

import '@/styles/globals.scss'


const abril_fatface = Abril_Fatface({
  subsets: ['latin'],
  weight: "400",
  variable: '--font-abril-fatface',
  display: 'swap',
})

const playfair_display = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
})


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
      <body className={`${abril_fatface.variable} ${playfair_display.variable}`}>
        <Header />
        <DarkModeToggle />
        {children}
      </body>
    </html>
  )
}
