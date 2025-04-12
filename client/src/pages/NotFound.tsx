import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-skyCanvas flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-heading font-bold text-empireBlue">404</h1>
        <p className="mt-4 text-lg font-body text-gray-600">Page not found</p>
        <Link
          to="/"
          className="mt-8 inline-block px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-empireBlue hover:bg-empireBlue/90"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
} 