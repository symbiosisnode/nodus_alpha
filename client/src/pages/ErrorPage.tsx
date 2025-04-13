import React from 'react';
import { Link, useNavigate, useRouteError } from 'react-router-dom';
import { NODUS_STYLE_GUIDE } from '../styles/NodusStyleGuide';
import { useDesignGuard } from '../hooks/useDesignGuard';

interface ErrorPageProps {
  statusCode?: number;
  title?: string;
  message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  statusCode = 404,
  title = 'Page Not Found',
  message = "The page you're looking for doesn't exist or has been moved.",
}) => {
  const routeError = useRouteError();
  const navigate = useNavigate();
  
  // Use design guard to validate component styles
  useDesignGuard('ErrorPage', {
    background: NODUS_STYLE_GUIDE.colors.background,
    textColor: NODUS_STYLE_GUIDE.colors.strongText,
    primary: NODUS_STYLE_GUIDE.colors.primary,
    fontFamily: NODUS_STYLE_GUIDE.typography.fontFamily,
  });

  // Log error details for debugging
  if (import.meta.env.DEV && routeError) {
    console.error('Route error:', routeError);
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center px-6 bg-background">
      <div className="w-full max-w-md p-8 bg-card rounded-xl shadow-card flex flex-col items-center text-center">
        <div 
          className="w-20 h-20 bg-primary flex items-center justify-center rounded-full mb-6"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          <span className="text-4xl font-semibold text-foreground">
            {statusCode === 404 ? '404' : '⚠️'}
          </span>
        </div>
        
        <h1 className="text-2xl font-semibold mb-2 text-strong-text">
          {title}
        </h1>
        
        <p className="text-base text-subtle mb-8">
          {message}
        </p>
        
        <div className="flex gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="button button-secondary"
          >
            Go Back
          </button>
          
          <Link 
            to="/"
            className="button button-primary"
          >
            Go Home
          </Link>
        </div>
        
        <div className="mt-10 pt-4 border-t border-border w-full text-sm text-subtle">
          <p>Need assistance? <a href="/support" className="text-primary hover:underline">Contact Support</a></p>
        </div>
      </div>
      
      <div className="mt-6 text-xs text-subtle flex items-center gap-2">
        <span>© NODUS {new Date().getFullYear()}</span>
        <span>•</span>
        <Link to="/privacy" className="hover:underline">Privacy</Link>
        <span>•</span>
        <Link to="/terms" className="hover:underline">Terms</Link>
      </div>
    </div>
  );
};

export default ErrorPage; 