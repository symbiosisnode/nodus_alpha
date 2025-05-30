import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          <div className="px-5 py-2">
            <Link to="/" className="text-base text-gray-500 hover:text-gray-900">
              Home
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link to="/dashboard" className="text-base text-gray-500 hover:text-gray-900">
              Dashboard
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link to="/onboarding" className="text-base text-gray-500 hover:text-gray-900">
              Get Started
            </Link>
          </div>
        </nav>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; {new Date().getFullYear()} NODUS. All rights reserved.
        </p>
      </div>
    </footer>
  );
} 