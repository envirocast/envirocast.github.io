import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EnviroCast - Quantum-Enhanced Air Quality Forecasting',
  description: 'Revolutionary hybrid quantum-classical algorithms for accurate air quality predictions. Advanced environmental modeling for a cleaner future.',
  keywords: 'quantum computing, air quality, environmental forecasting, machine learning, atmospheric modeling',
  authors: [{ name: 'EnviroCast Team' }],
  openGraph: {
    title: 'EnviroCast - Quantum-Enhanced Air Quality Forecasting',
    description: 'Revolutionary hybrid quantum-classical algorithms for accurate air quality predictions.',
    url: 'https://envirocast.github.io',
    siteName: 'EnviroCast',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EnviroCast - Quantum-Enhanced Air Quality Forecasting',
    description: 'Revolutionary hybrid quantum-classical algorithms for accurate air quality predictions.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
