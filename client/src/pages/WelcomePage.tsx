import React from 'react';
import { Link } from 'react-router-dom';
import { NODUS_STYLE_GUIDE } from '../styles/NodusStyleGuide';
import { useDesignGuard } from '../hooks/useDesignGuard';

const WelcomePage: React.FC = () => {
  // Check design compliance with NODUS Style Guide
  useDesignGuard('WelcomePage', {
    primaryColor: NODUS_STYLE_GUIDE.colors.primary,
    backgroundColor: NODUS_STYLE_GUIDE.colors.background,
    fontFamily: NODUS_STYLE_GUIDE.typography.fontFamily,
  });
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-strong-text leading-tight">
                The Future of <span className="text-primary">Equity</span> is Accessible to All
              </h1>
              <p className="mt-6 text-xl text-subtle">
                This Isn't a Platform. It's a Reckoning.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link 
                  to="/signup" 
                  className="button button-primary py-3 px-8 text-base"
                >
                  Get Started
                </Link>
                <Link 
                  to="/learn-more" 
                  className="button button-secondary py-3 px-8 text-base"
                >
                  Learn How It Works
                </Link>
              </div>
            </div>
            <div className="hidden md:block relative">
              {/* Placeholder for a future illustration/image */}
              <div className="aspect-square rounded-2xl bg-primary/10 flex items-center justify-center">
                <div className="w-3/4 h-3/4 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <div className="w-1/2 h-1/2 rounded-xl bg-primary/40 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-foreground font-bold text-xl">NODUS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission Statement Section */}
      <section className="py-16 bg-foreground text-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
          <p className="text-xl leading-relaxed mb-6">
            At NODUS, we're committed to a future where <strong>equity</strong>, <strong>dignity</strong>, and <strong>ownership</strong> are accessible to all. 
          </p>
          <p className="text-lg">
            Start Where You Are. We'll meet you there and build together.
          </p>
        </div>
      </section>
      
      {/* Core Roles Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-strong-text mb-16">The 3 Core Roles in the NODUS Ecosystem</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* MTO */}
            <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">MTO</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Mass Territory Operator</h3>
              <p className="text-subtle mb-4">
                Leaders who coordinate resources across regions and develop key partnerships to expand the NODUS vision.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Regional strategy development
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Network expansion oversight
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Resource allocation
                </li>
              </ul>
            </div>
            
            {/* GP */}
            <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">GP</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Growth Partner</h3>
              <p className="text-subtle mb-4">
                Local leaders who build community connections and ensure NODUS principles are applied in their territories.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Community building
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Local territory development
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Principle implementation
                </li>
              </ul>
            </div>
            
            {/* SA */}
            <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">SA</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Service Advocate</h3>
              <p className="text-subtle mb-4">
                Front-line team members who engage directly with community members and provide essential services.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Direct community engagement
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Service delivery
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Feedback collection
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary/10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-strong-text">Ready to Start Your NODUS Journey?</h2>
          <p className="text-lg mb-8 text-subtle">
            Join us in building a more equitable future, one territory at a time.
          </p>
          <Link 
            to="/signup" 
            className="button button-primary py-3 px-8 text-lg"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
      
      {/* Footer with UX article and design compliance */}
      <footer className="py-12 px-6 bg-foreground text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">NODUS</h3>
              <p className="mb-4">Modern equity and ownership platform for the future.</p>
              <a 
                href={NODUS_STYLE_GUIDE.references.uxArticle}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center"
              >
                <span>Design Principles</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Links</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-primary">About</Link></li>
                <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
                <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
                <li><Link to="/careers" className="hover:text-primary">Careers</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/terms" className="hover:text-primary">Terms</Link></li>
                <li><Link to="/privacy" className="hover:text-primary">Privacy</Link></li>
                <li><Link to="/cookies" className="hover:text-primary">Cookies</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">© {new Date().getFullYear()} NODUS. All rights reserved.</p>
            <div className="text-sm flex items-center">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Verified by NODUS UX Integrity Layer v1.0
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage; 