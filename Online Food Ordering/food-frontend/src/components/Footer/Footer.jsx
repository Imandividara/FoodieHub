import React from 'react';
// Removed Material UI and icons. Use only Tailwind CSS and React components.

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="font-display text-gradient font-bold mb-4 text-2xl">FoodieHub</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Discover the best restaurants in your city. Order your favorite meals with just a few clicks 
              and enjoy fast, reliable delivery right to your doorstep.
            </p>
            <div className="flex gap-2">
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors" aria-label="Facebook">
                {/* Facebook SVG */}
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors" aria-label="Twitter">
                {/* Twitter SVG */}
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.384 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.247a4.904 4.904 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.209c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0024 4.557z"/></svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors" aria-label="Instagram">
                {/* Instagram SVG */}
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.425 3.678 1.406c-.98.98-1.274 2.092-1.334 3.374C2.013 8.332 2 8.741 2 12c0 3.259.013 3.668.072 4.948.06 1.282.354 2.394 1.334 3.374.98.98 2.092 1.274 3.374 1.334C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.282-.06 2.394-.354 3.374-1.334.98-.98 1.274-2.092 1.334-3.374.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.06-1.282-.354-2.394-1.334-3.374-.98-.98-2.092-1.274-3.374-1.334C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-white text-lg">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <a href="/" className="text-gray-300 hover:text-yellow-400 transition-colors no-underline">Home</a>
              <a href="/restaurants" className="text-gray-300 hover:text-yellow-400 transition-colors no-underline">Restaurants</a>
              <a href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors no-underline">About Us</a>
              <a href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors no-underline">Contact</a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-white text-lg">Customer Support</h3>
            <div className="flex flex-col gap-2">
              <a href="/help" className="text-gray-300 hover:text-yellow-400 transition-colors no-underline">Help Center</a>
              <a href="/faq" className="text-gray-300 hover:text-yellow-400 transition-colors no-underline">FAQ</a>
              <a href="/terms" className="text-gray-300 hover:text-yellow-400 transition-colors no-underline">Terms of Service</a>
              <a href="/privacy" className="text-gray-300 hover:text-yellow-400 transition-colors no-underline">Privacy Policy</a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-white text-lg">Contact Info</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                {/* Location SVG */}
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.418 0-8-3.582-8-8 0-4.418 3.582-8 8-8s8 3.582 8 8c0 4.418-3.582 8-8 8z" /><circle cx="12" cy="13" r="4" /></svg>
                <span className="text-gray-300">123 Food Street, City Center</span>
              </div>
              <div className="flex items-center gap-2">
                {/* Phone SVG */}
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm10-10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                {/* Email SVG */}
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75h-9A2.25 2.25 0 005.25 6v12A2.25 2.25 0 007.5 20.25h9a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0016.5 3.75zM5.25 6l6.75 6.75L18.75 6" /></svg>
                <span className="text-gray-300">support@foodiehub.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6">
          <p className="text-center text-gray-400 text-sm">
            © 2024 FoodieHub. All rights reserved. Made with <span className="text-red-400">❤️</span> for food lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
