import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children, role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`dashboard-layout ${sidebarOpen ? "sidebar-open" : ""}`}>
      {/* Mobile Top Navigation Header */}
      <div className="mobile-header">
        <button
          className="hamburger-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>
        <span className="mobile-brand-title">CollabBridge</span>
      </div>

      {/* Backdrop overlay for mobile */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar role={role} />

      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;