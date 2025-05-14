'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import './colors.css';
import Navigation from './components/Navigation';
import { CartProvider } from './context/CartContext';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { organizationSchema } from './index';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Head from 'next/head';

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
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/favicon.png?v=2" />
        {/* JSON-LD structured data */}
        <Script
          id="schema-org-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
        {/* Google Tag Manager - for detailed event tracking */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXXXXX');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />
        <CartProvider>
          {showNavigation && <Navigation />}
          {children}
          <Analytics />
          <SpeedInsights />
        </CartProvider>
      </body>
    </html>
  );
}
