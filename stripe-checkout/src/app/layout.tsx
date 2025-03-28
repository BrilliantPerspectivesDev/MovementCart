'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./colors.css";
import { CartProvider } from './context/CartContext'
import Script from "next/script";
import Navigation from './components/Navigation';
import { usePathname } from 'next/navigation';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showNavigation = !pathname?.includes('/checkout');

  return (
    <html lang="en">
      <head>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          {showNavigation && <Navigation />}
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
