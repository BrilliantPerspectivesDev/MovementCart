'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import './colors.css';
import Navigation from './components/Navigation';
import { CartProvider } from './context/CartContext';
import { usePathname } from 'next/navigation';

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
      <body className={inter.className}>
        <CartProvider>
          {showNavigation && <Navigation />}
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
