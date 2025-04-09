'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import './colors.css';
import Navigation from './components/Navigation';
import { CartProvider } from './context/CartContext';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { organizationSchema } from './metadata';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showNavigation = !pathname?.includes('/checkout') && !pathname?.includes('/success') && !pathname?.includes('/thank-you');

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* JSON-LD structured data */}
        <Script
          id="schema-org-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
      </head>
      <body className={inter.className}>
        <CartProvider>
          {showNavigation && <Navigation />}
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
