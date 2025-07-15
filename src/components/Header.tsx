"use client";

import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-purple-600">bilio</a>
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
          
          {/* Login Button */}
          <div className="flex-shrink-0">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Logga in
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 