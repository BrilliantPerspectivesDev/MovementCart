'use client';

import Image from 'next/image';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition transform hover:scale-[1.02] hover:shadow-lg">
      <div className="relative h-48 md:h-64 w-full">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-indigo-600 font-bold">${product.price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
} 