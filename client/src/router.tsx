import React from 'react';
import { createBrowserRouter, Outlet, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard'; // Import the new Dashboard
import WelcomePage from './pages/WelcomePage'; // Import the new WelcomePage
import Login from './pages/Login';
import MTOView from './pages/MTOView'; // Renamed
import GPView from './pages/GPView';   // Renamed
import SAView from './pages/SAView';   // Renamed
import NotFound from './pages/NotFound';
import DashboardLayout from './layouts/DashboardLayout'; // Import the layout
import ErrorPage from './pages/ErrorPage'; // Import the error page

// Placeholder for sub-pages
const PlaceholderPage = ({ title }: { title: string }) => <div><h2>{title} Placeholder</h2><p>Content coming soon...</p></div>;

// Simple base layout for non-dashboard pages
const BaseLayout = () => (
  <div className="min-h-screen bg-background font-sans">
    <Outlet />
  </div>
);

// Component to determine initial dashboard route based on stored role
const DashboardRedirect = () => {
    const role = localStorage.getItem('nodus_user_role')?.toLowerCase() || 'sa';
    return <Navigate to={`/${role}`} replace />;
};

export const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    errorElement: <ErrorPage />, // Use our custom error page
    children: [
      { path: '/', element: <WelcomePage /> }, // Use WelcomePage as landing
      { path: '/landing', element: <Landing /> }, // Keep original landing accessible
      { path: '/login', element: <Login /> },
      { path: '/onboarding', element: <Onboarding /> },
      { path: '/demo', element: <Dashboard /> }, // Direct access to demo dashboard
    ],
  },
  {
    // Routes protected by/rendered within DashboardLayout
    element: <DashboardLayout />,
    errorElement: <ErrorPage />, // Use our custom error page
    children: [
        // Redirect /dashboard to the actual role dashboard
        { path: '/dashboard', element: <DashboardRedirect /> },
        // Specific role dashboards
        { path: '/mto', element: <MTOView /> },
        { path: '/gp', element: <GPView /> },
        { path: '/sa', element: <SAView /> },
        // Placeholder sub-routes accessible within the dashboard layout
        { path: '/network', element: <PlaceholderPage title="Network" /> },
        { path: '/properties', element: <PlaceholderPage title="Properties" /> },
        { path: '/referrals', element: <PlaceholderPage title="Referrals" /> },
        { path: '/equity', element: <Dashboard /> }, // Add equity route to accessible dashboard
        { path: '/badges', element: <PlaceholderPage title="Badges" /> },
        { path: '/settings', element: <PlaceholderPage title="Settings" /> },
    ],
  },
]); 