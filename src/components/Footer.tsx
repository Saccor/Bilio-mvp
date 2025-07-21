export default function Footer() {
  return (
    <footer className="bg-white shadow-sm border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center h-16 sm:h-20">
                     {/* Logo */}
           <div className="flex-shrink-0 mb-2 sm:mb-0">
             <a href="/" className="flex items-center">
               <img 
                 src="/Startup Car Selling Logo with Blue and White Palette.png" 
                 alt="Bilio" 
                 className="h-12 w-12 rounded-full object-cover"
               />
             </a>
           </div>
          
          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
              Jämför
            </a>
            <a href="/om-bilio" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
              Om Bilio
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
              Priser
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
              Kontakt
            </a>
          </nav>
          
          {/* Right Side - Copyright and Social */}
          <div className="flex-shrink-0 flex items-center space-x-4">
            <p className="text-xs text-gray-400 hidden sm:block">
              © 2024 Bilio
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.017 0H7.983C3.578 0 0 3.578 0 7.983v4.034C0 16.422 3.578 20 7.983 20h4.034C16.422 20 20 16.422 20 12.017V7.983C20 3.578 16.422 0 12.017 0zM18.47 12.017c0 3.557-2.896 6.452-6.453 6.452H7.983c-3.557 0-6.452-2.895-6.452-6.452V7.983c0-3.557 2.895-6.452 6.452-6.452h4.034c3.557 0 6.453 2.895 6.453 6.452v4.034z" />
                  <path d="M10 5.378c-2.552 0-4.622 2.069-4.622 4.622S7.448 14.622 10 14.622s4.622-2.069 4.622-4.622S12.552 5.378 10 5.378zM10 12.622c-1.449 0-2.622-1.173-2.622-2.622S8.551 7.378 10 7.378s2.622 1.173 2.622 2.622S11.449 12.622 10 12.622z" />
                  <circle cx="14.8" cy="5.2" r="1.1" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Mobile Copyright */}
        <div className="sm:hidden pb-4 text-center">
          <p className="text-xs text-gray-400">© 2024 Bilio. Alla rättigheter förbehållna.</p>
        </div>
      </div>
    </footer>
  );
} 