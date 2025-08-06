"use client";

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import UserButton from './UserButton';

export default function Header() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image 
                src="/Startup Car Selling Logo with Blue and White Palette.png" 
                alt="Bilio" 
                width={40}
                height={40}
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg object-cover"
                priority
              />
              <span className="ml-2 text-lg font-bold text-gray-900 hidden sm:block">Bilio</span>
            </Link>
          </div>
          
                  {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-1">
          <Link 
            href="/" 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mounted && pathname === '/' 
                ? 'text-gray-900 bg-gray-100' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Jämför
          </Link>
          <Link 
            href="/om-bilio" 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mounted && pathname === '/om-bilio' 
                ? 'text-gray-900 bg-gray-100' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            prefetch={false}
          >
            Om Bilio
          </Link>
        </nav>

          {/* Mobile menu button & User Authentication */}
          <div className="flex items-center space-x-2">
            <div className="hidden sm:block">
              <UserButton />
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-200 mt-2">
            <Link 
              href="/" 
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mounted && pathname === '/' 
                  ? 'text-gray-900 bg-gray-100' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Jämför
            </Link>
            <Link 
              href="/om-bilio" 
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mounted && pathname === '/om-bilio' 
                  ? 'text-gray-900 bg-gray-100' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
              prefetch={false}
            >
              Om Bilio
            </Link>
            <div className="sm:hidden pt-2 border-t border-gray-200">
              <UserButton />
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 