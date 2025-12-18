'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent pt-4 pb-2'}`}>
      <div className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${scrolled ? 'h-20' : 'h-16'}`}>
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image
                src="/Blacklogo.png" 
                alt="Brilliant Logo"
                width={120}
                height={30}
                className={`transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-90'}`}
                priority
              />
            </Link>
          </div>
          
          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/ambassador" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${scrolled ? 'text-gray-700 hover:text-[#2A9D8F]' : 'text-gray-500 hover:text-gray-900'}`}>
              Affiliate Program
            </Link>
            <Link href="/checkout" className="px-4 py-2 rounded-md bg-[#E9C46A] text-gray-800 text-sm font-medium hover:bg-[#e6bd58] transition-colors">
              Join the Movement
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden w-[80%] mx-auto bg-white shadow-lg rounded-b-lg ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link href="/ambassador" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700">
            Affiliate Program
          </Link>
          <Link href="/checkout" className="block pl-3 pr-4 py-2 bg-[#E9C46A] text-gray-800 text-base font-medium">
            Join the Movement
          </Link>
        </div>
      </div>
    </nav>
  );
} 