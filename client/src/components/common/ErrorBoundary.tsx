import React, { Component, ErrorInfo } from 'react';
import { Button } from './Button';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });
    
    // Log error to analytics or error tracking service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-600 mb-6">
                We're sorry, but NODUS encountered an unexpected error. Our team has been notified.
              </p>
              
              {process.env.NODE_ENV === 'development' && (
                <div className="mb-6 p-4 bg-gray-100 rounded">
                  <p className="text-sm font-mono text-red-600">
                    {this.state.error?.toString()}
                  </p>
                  <details className="mt-2 text-sm">
                    <summary>Component Stack</summary>
                    <pre className="mt-2 p-2 bg-gray-200 rounded overflow-auto">
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </details>
                </div>
              )}

              <div className="space-y-4">
                <Button
                  onClick={this.handleReset}
                  className="w-full"
                  variant="primary"
                >
                  Try Again
                </Button>
                <Button
                  onClick={this.handleReload}
                  className="w-full"
                  variant="secondary"
                >
                  Reload Page
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 