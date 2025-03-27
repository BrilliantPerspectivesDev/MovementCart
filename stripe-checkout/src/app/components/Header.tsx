'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { ShoppingCartIcon } from './Icons';

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
          <Link href="/cart" className="relative group">
            <ShoppingCartIcon className="w-6 h-6 text-gray-700 group-hover:text-indigo-600" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
} 