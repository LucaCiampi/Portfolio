import { Metadata } from 'next';
import { Playfair_Display, Abril_Fatface, Allison } from 'next/font/google';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTransitionEffect from '@/components/PageTransitionEffect';
import AnimatedCursorComponent from '@/components/AnimatedCursorComponent';

import './globals.css';
import '@/styles/globals.scss';

const abril_fatface = Abril_Fatface({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-abril-fatface',
  display: 'swap',
});

const playfair_display = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

const allison = Allison({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-allison',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('http://lucaciampi.fr'),
  title: {
    template: '%s | Luca Ciampi',
    default: 'Luca Ciampi',
  },
  description:
    'Hello 👋🏼 I am a front-end React, React native and Next.js developer currently based in Lyon. I am specialized in static websites, progressive web applications and mobile applications.',
  openGraph: {
    images: ['images/thumbnail.jpg'],
  },
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body
        className={`${abril_fatface.variable} ${playfair_display.variable} ${allison.variable} bg-background text-text`}
      >
        <Header />
        <PageTransitionEffect>{children}</PageTransitionEffect>
        <Footer />
        <div className="fixed inset-0 bg-noise bg-repeat z-40 pointer-events-none" />
        <AnimatedCursorComponent />
      </body>
    </html>
  );
}
