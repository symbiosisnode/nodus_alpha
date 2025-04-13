import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import Sidebar from './Sidebar'; // Assuming Sidebar is in the same directory
import Topbar from './Topbar'; // Assuming Topbar will be created here too

// Define the type for children explicitly for TypeScript
interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout() {
  return (
    // Use Vuexy layout classes
    <div className="layout-wrapper layout-content-navbar layout-menu-fixed">
      <div className="layout-container">
        <Sidebar />
        <div className="layout-page">
          <Topbar />
          {/* Content Wrapper */}
          <div className="content-wrapper">
            {/* Main Content Area */}
            <main className="container-xxl flex-grow-1 container-p-y"> {/* Added container classes */}
              <Outlet /> {/* Use Outlet instead of children */}
            </main>
            {/* Optional: Footer can go here */}
             {/* <footer className="content-footer footer bg-footer-theme">...</footer> */}
             <div className="content-backdrop fade"></div>
          </div> {/* End Content Wrapper */}
        </div> {/* End Layout Page */}
      </div> {/* End Layout Container */}

      {/* Optional: Overlay & Drag Target */}
      <div className="layout-overlay layout-menu-toggle"></div>
      <div className="drag-target"></div>

    </div> /* End Layout Wrapper */
  );
} 