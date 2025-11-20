import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif']
});

export const metadata: Metadata = {
  title: {
    default: 'Curensi - Funding Rate Arbitrage Platform',
    template: '%s | Curensi'
  },
  other: {
    'x-prefetch-font': 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap'
  },
  description: 'Curensi: Real-time funding rate arbitrage opportunities across major crypto exchanges. Market-neutral cash and carry strategies with AI-powered analysis.',
  keywords: [
    'Curensi',
    'funding rate',
    'arbitrage',
    'crypto',
    'cash and carry',
    'market neutral',
    'futures',
    'perpetual swaps',
    'deFi',
    'trading',
    'yield'
  ],
  authors: [{ name: 'Curensi' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://curensi.com',
    siteName: 'Curensi',
    title: 'Curensi - Real-time Funding Rate Arbitrage Opportunities',
    description: 'Discover market-neutral yield opportunities through funding rate arbitrage across major crypto exchanges with Curensi.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Curensi - Funding Rate Arbitrage Platform'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Curensi - Real-time Funding Rate Opportunities',
    description: 'Market-neutral yield opportunities through funding rate arbitrage with Curensi.',
    images: ['/og-image.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`h-full font-sans antialiased ${inter.variable}`}>
        <Script id="font-loading-detection">
          {`
            // Font loading detection
            document.fonts.ready.then(() => {
              document.body.classList.add('font-loaded');
            }).catch(() => {
              // Font failed to load, fallback is already applied
              document.body.classList.add('font-fallback');
            });

            // Fallback timeout in case fonts.ready never resolves
            setTimeout(() => {
              if (!document.body.classList.contains('font-loaded')) {
                document.body.classList.add('font-fallback');
              }
            }, 2000);
          `}
        </Script>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}