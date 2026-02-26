import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard, Settings, Users, CalendarDays, MessageSquare } from "lucide-react";

const sidebarItems = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1" y="1" width="7" height="7" rx="1.5" fill="#6366f1" opacity="0.8"/>
        <rect x="10" y="1" width="7" height="7" rx="1.5" fill="#6366f1" opacity="0.5"/>
        <rect x="1" y="10" width="7" height="7" rx="1.5" fill="#6366f1" opacity="0.5"/>
        <rect x="10" y="10" width="7" height="7" rx="1.5" fill="#6366f1" opacity="0.3"/>
      </svg>
    ),
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="3.5" stroke="#22c55e" strokeWidth="2"/>
        <path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.05 3.05l1.41 1.41M13.54 13.54l1.41 1.41M3.05 14.95l1.41-1.41M13.54 4.46l1.41-1.41" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: "Services",
    path: "/service",
    active: true,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 9a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="#64748b" strokeWidth="1.5"/>
        <path d="M2 16c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: "Staff",
    path: "/staff",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="3" width="14" height="13" rx="2" stroke="#64748b" strokeWidth="1.5"/>
        <path d="M6 1v4M12 1v4M2 8h14" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: "Appointments",
    path: "/appointments",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M15 3H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3l3 3 3-3h3a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Z" stroke="#64748b" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M6 7h6M6 10h4" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: "Chatbot",
    path: "/chatbot",
  },
];

function SidebarContent({ onClose, isMobile }) {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="sidebar-inner">
      {/* Header */}
      <div className="sidebar-header">
        <div className="brand">
          <div className="brand-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L3 7v11h5v-5h4v5h5V7L10 2Z" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <span className="brand-name">Acme Inc.</span>
        </div>
        {isMobile && (
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {sidebarItems.map((item, i) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={i}
              to={item.path}
              onClick={onClose}
              className={`nav-item ${isActive ? "nav-item--active" : ""}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={logout}>
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>

      <style>{`
        .sidebar-inner {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid #f1f5f9;
          flex-shrink: 0;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .brand-icon {
          width: 32px;
          height: 32px;
          background: #22c55e;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .brand-name {
          font-size: 15px;
          font-weight: 600;
          color: #0f172a;
          letter-spacing: -0.01em;
        }

        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          color: #64748b;
          border-radius: 6px;
          display: flex;
          align-items: center;
          transition: background 0.15s;
        }

        .close-btn:hover {
          background: #f1f5f9;
        }

        .sidebar-nav {
          flex: 1;
          padding: 12px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          overflow-y: auto;
          min-height: 0;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          border-radius: 8px;
          text-decoration: none;
          color: #475569;
          font-size: 14px;
          font-weight: 450;
          transition: background 0.15s, color 0.15s;
          flex-shrink: 0;
        }

        .nav-item:hover {
          background: #f8fafc;
          color: #0f172a;
        }

        .nav-item--active {
          background: #f0fdf4;
          color: #16a34a;
          font-weight: 500;
        }

        .nav-item--active .nav-icon svg path,
        .nav-item--active .nav-icon svg circle {
          stroke: #16a34a !important;
        }

        .nav-icon {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .nav-label {
          white-space: nowrap;
        }

        .sidebar-footer {
          padding: 12px;
          border-top: 1px solid #f1f5f9;
          flex-shrink: 0;
        }

        .logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 16px;
          background: #1e293b;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s;
          font-family: inherit;
        }

        .logout-btn:hover {
          background: #0f172a;
        }
      `}</style>
    </div>
  );
}

function Reusesidebar({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="layout">
      {/* Desktop Sidebar */}
      <aside className="desktop-sidebar">
        <SidebarContent onClose={() => {}} isMobile={false} />
      </aside>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside className={`mobile-drawer ${mobileOpen ? "mobile-drawer--open" : ""}`}>
        <SidebarContent onClose={() => setMobileOpen(false)} isMobile={true} />
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Mobile Top Bar */}
        <header className="mobile-topbar">
          <button
            className="hamburger-btn"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <div className="mobile-brand">
            <div className="mobile-brand-icon">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L3 7v11h5v-5h4v5h5V7L10 2Z" fill="white" opacity="0.9"/>
              </svg>
            </div>
            <span>Acme Inc.</span>
          </div>
        </header>

        <div className="page-content">{children}</div>
      </div>

      <style>{`
        * { box-sizing: border-box; }

        .layout {
          display: flex;
          min-height: 100vh;
          width: 100%;
          background: #f8fafc;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        /* ── Desktop Sidebar ── */
        .desktop-sidebar {
          width: 220px;
          flex-shrink: 0;
          border-right: 1px solid #e2e8f0;
          background: #ffffff;
          display: none;
          position: fixed;
          left: 0;
          top: 0;
          height: 100vh;
          overflow: hidden;
        }

        @media (min-width: 768px) {
          .desktop-sidebar {
            display: flex;
            flex-direction: column;
          }
        }

        /* ── Mobile Backdrop ── */
        .mobile-backdrop {
          position: fixed;
          inset: 0;
          z-index: 40;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(2px);
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (min-width: 768px) {
          .mobile-backdrop { display: none; }
        }

        /* ── Mobile Drawer ── */
        .mobile-drawer {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 50;
          height: 100%;
          width: 220px;
          background: white;
          border-right: 1px solid #e2e8f0;
          box-shadow: 4px 0 24px rgba(0,0,0,0.12);
          transform: translateX(-100%);
          transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }

        .mobile-drawer--open {
          transform: translateX(0);
        }

        @media (min-width: 768px) {
          .mobile-drawer { display: none; }
        }

        /* ── Main Content ── */
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        @media (min-width: 768px) {
          .main-content {
            margin-left: 220px;
          }
        }

        /* ── Mobile Top Bar ── */
        .mobile-topbar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: white;
          border-bottom: 1px solid #e2e8f0;
          position: sticky;
          top: 0;
          z-index: 30;
        }

        @media (min-width: 768px) {
          .mobile-topbar { display: none; }
        }

        .hamburger-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          color: #475569;
          border-radius: 8px;
          display: flex;
          align-items: center;
          transition: background 0.15s;
        }

        .hamburger-btn:hover {
          background: #f1f5f9;
        }

        .mobile-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
        }

        .mobile-brand-icon {
          width: 26px;
          height: 26px;
          background: #22c55e;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .page-content {
          flex: 1;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
}

export default Reusesidebar;