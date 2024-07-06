import { TimeProvider } from '@/components/TimeContext';
import { Metadata } from 'next';
import { Playfair_Display, Abril_Fatface, Allison } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import './globals.css';

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
  title: {
    template: '%s | Luca Ciampi',
    default: 'Luca Ciampi',
  },
  description: 'Portfolio de Luca Ciampi',
  // TODO: add default og image
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <TimeProvider>
        <body
          className={`${abril_fatface.variable} ${playfair_display.variable} ${allison.variable} bg-background`}
        >
          <Header />
          <Header revealOnScroll />
          {children}
          <Footer />
          <div className="fixed inset-0 bg-noise bg-repeat z-40 pointer-events-none" />
        </body>
      </TimeProvider>
    </html>
  );
}
