import { useState, useContext, useEffect } from "react";
import {
  Building2,
  TrendingUp,
  Plus,
  Home,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const AdminSidebar = ({ currentPage, setCurrentPage }) => {
  const { logout } = useContext(AuthContext);

  // ✅ Sidebar open/closed state
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", page: "admin-dashboard", icon: TrendingUp },
    { name: "Add Property", page: "add-property", icon: Plus },
    { name: "View Site", page: "home", icon: Home },
  ];

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  // Close sidebar when clicking outside or pressing Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <>
      {/* ===== HAMBURGER MENU BUTTON (Always Visible) ===== */}
      <button
        onClick={toggleSidebar}
        style={{
          position: "fixed",
          top: "1.5rem",
          left: "1.5rem",
          zIndex: 2000,
          background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
          border: "none",
          borderRadius: "12px",
          padding: "0.75rem",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0 6px 16px rgba(37, 99, 235, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.3)";
        }}
      >
        <Menu style={{ width: "1.5rem", height: "1.5rem", color: "white" }} />
      </button>

      {/* ===== OVERLAY (Fades Dashboard when sidebar is open) ===== */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 1998,
            animation: "fadeIn 0.3s ease",
            backdropFilter: "blur(2px)",
          }}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <div
        style={{
          width: "280px",
          background: "white",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1999,
          boxShadow: "4px 0 20px rgba(0, 0, 0, 0.15)",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* ===== HEADER ===== */}
        <div
          style={{
            padding: "1.5rem",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Building2
              style={{
                width: "2.5rem",
                height: "2.5rem",
                color: "#2563eb",
                flexShrink: 0,
                animation: "pulse 3s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                background: "linear-gradient(135deg, #2563eb 0%, #dc2626 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Admin Panel
            </span>
          </div>

          {/* Close Button */}
          <button
            onClick={toggleSidebar}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#4b5563",
              padding: "0.5rem",
              borderRadius: "8px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f3f4f6";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
            title="Close Sidebar"
          >
            <X size={24} />
          </button>
        </div>

        {/* ===== NAVIGATION ===== */}
        <nav
          style={{
            flex: 1,
            padding: "1rem 0",
            overflowY: "auto",
          }}
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.page;

            return (
              <button
                key={item.page}
                onClick={() => {
                  setCurrentPage(item.page);
                  setIsOpen(false); // Close sidebar after navigation
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  justifyContent: "flex-start",
                  padding: "1rem 1.5rem",
                  color: isActive ? "#2563eb" : "#4b5563",
                  fontWeight: 600,
                  background: isActive
                    ? "linear-gradient(90deg, #eff6ff 0%, #dbeafe 100%)"
                    : "transparent",
                  border: "none",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  borderLeft: isActive
                    ? "4px solid #2563eb"
                    : "4px solid transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "#f9fafb";
                    e.currentTarget.style.color = "#2563eb";
                    e.currentTarget.style.paddingLeft = "1.75rem";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#4b5563";
                    e.currentTarget.style.paddingLeft = "1.5rem";
                  }
                }}
              >
                <Icon
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    flexShrink: 0,
                  }}
                />
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* ===== FOOTER ===== */}
        <div
          style={{
            padding: "1.5rem",
            borderTop: "1px solid #e5e7eb",
            background: "#fafafa",
          }}
        >
          <button
            onClick={logout}
            title="Logout"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "1rem",
              padding: "0.875rem 1.5rem",
              color: "#dc2626",
              fontWeight: 600,
              background: "transparent",
              border: "2px solid transparent",
              borderRadius: "12px",
              width: "100%",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#fef2f2";
              e.currentTarget.style.color = "#991b1b";
              e.currentTarget.style.borderColor = "#fecaca";
              e.currentTarget.style.transform = "translateX(4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#dc2626";
              e.currentTarget.style.borderColor = "transparent";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            <LogOut
              style={{ width: "1.25rem", height: "1.25rem", flexShrink: 0 }}
            />
            Logout
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
        `}
      </style>
    </>
  );
};

export default AdminSidebar;
