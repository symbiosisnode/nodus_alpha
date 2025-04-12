import React from 'react';
import { Link } from 'react-router-dom';
import FeatureBenefits from '../components/FeatureBenefits';
import ScriptOverview from '../components/ScriptOverview';

export default function Landing() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-skyCanvas via-white to-skyCanvas">
      {/* Background decorative shapes (optional) */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-growthGreen/10 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-empireBlue/10 rounded-full filter blur-3xl opacity-50 animate-pulse delay-1000"></div>

      <main className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-empireBlue tracking-tight">
          Own the Revolution.
          <span className="block text-auroraOrange">Not Just a Job.</span>
        </h1>
        <p className="mt-6 max-w-lg mx-auto text-lg sm:text-xl text-gray-600 font-body">
          NODUS connects real estate professionals in a dynamic, equity-driven network.
          Grow your influence, build your wealth.
        </p>
        <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/onboarding"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-empireBlue hover:bg-empireBlue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-empireBlue transition duration-150 ease-in-out"
          >
            Join the Network
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-empireBlue text-base font-medium rounded-md text-empireBlue bg-white hover:bg-skyCanvas focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-empireBlue transition duration-150 ease-in-out"
          >
            Sign In
          </Link>
        </div>
        {/* Optional: Feature highlights or icons below */}
      </main>
    </div>
  );
}