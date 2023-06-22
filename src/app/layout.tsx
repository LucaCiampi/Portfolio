import { Metadata } from 'next'
import { Playfair_Display, Abril_Fatface } from 'next/font/google'
import Header from '@/components/header'
import Image from 'next/image'
import './globals.css'
import '@/styles/globals.scss'

import Background from 'public/images/paper.jpg'


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


export const metadata: Metadata = {
  title: {
    template: '%s | Luca Ciampi',
    default: 'Luca Ciampi', // a default is required when creating a template
  },
  description: 'Portfolio de Luca Ciampi'
  // TODO: add default og image
}

interface Props {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${abril_fatface.variable} ${playfair_display.variable}`}>
        <Header />
        {children}
        {/* <Image src={Background} alt={'background'} className='fixed inset-0 -z-10 w-screen' /> */}
        <div className="background-paper"></div>
      </body>
    </html>
  )
}
