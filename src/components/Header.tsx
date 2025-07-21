"use client";

import { usePathname } from 'next/navigation';
import UserButton from './UserButton';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <img 
                src="/Startup Car Selling Logo with Blue and White Palette.png" 
                alt="Bilio" 
                className="h-12 w-12 rounded-full object-cover"
              />
            </a>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a 
              href="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === '/' 
                  ? 'text-orange-500 bg-orange-50' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Jämför
            </a>
            <a 
              href="/om-bilio" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === '/om-bilio' 
                  ? 'text-orange-500 bg-orange-50' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Om Bilio
            </a>
          </nav>
          
          {/* User Authentication */}
          <div className="flex-shrink-0">
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
} 