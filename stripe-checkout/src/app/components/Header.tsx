'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-10 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition">
          ShopStripe
        </Link>
        
        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-gray-700 hover:text-indigo-600 font-medium">
            Products
          </Link>
        </nav>
      </div>
    </header>
  );
} 