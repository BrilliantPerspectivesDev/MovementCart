'use client';

import Image from 'next/image';
import { CartItem as CartItemType } from '../types';
import { useCart } from '../context/CartContext';
import { PlusIcon, MinusIcon, TrashIcon } from './Icons';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 py-4 border-b border-gray-200">
      <div className="relative h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 96px, 128px"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-gray-500 text-sm">No image</span>
          </div>
        )}
      </div>
      
      <div className="flex-grow">
        <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
        <p className="text-gray-600 text-sm">{item.description}</p>
        <div className="mt-2 text-indigo-600 font-bold">${item.price.toFixed(2)}</div>
      </div>
      
      <div className="flex flex-col items-center sm:items-end">
        <div className="flex items-center border rounded-md overflow-hidden">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition"
            aria-label="Decrease quantity"
          >
            <MinusIcon className="w-4 h-4" />
          </button>
          
          <span className="px-4 py-1">{item.quantity}</span>
          
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition"
            aria-label="Increase quantity"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
        
        <button
          onClick={() => removeFromCart(item.id)}
          className="mt-2 text-red-500 hover:text-red-700 flex items-center text-sm font-medium"
          aria-label="Remove item"
        >
          <TrashIcon className="w-4 h-4 mr-1" />
          Remove
        </button>
        
        <div className="mt-2 text-gray-700 font-medium">
          Total: ${(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
    </div>
  );
} 