import { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo1.png";

const Navbar = ({ currentPage, setCurrentPage }) => {
  const { user, logout } = useContext(AuthContext);
  const [mobileMenu, setMobileMenu] = useState(false);

  const navLinks = [
    { name: "Home", page: "home" },
    { name: "Listings", page: "listings" },
    { name: "About", page: "about" },
    { name: "Contact", page: "contact" },
  ];

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-indigo-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* ===== LOGO ===== */}
          <div
            onClick={() => handleNavigate("home")}
            className="flex items-center cursor-pointer group flex-shrink-0"
          >
            <img
              src={logo}
              alt="Hi-Tech Homes Logo"
              className="h-16 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* ===== DESKTOP NAVIGATION ===== */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <div key={link.page} className="group relative">
                  <button
                    onClick={() => handleNavigate(link.page)}
                    className={`text-sm lg:text-base font-semibold tracking-wide transition-all pb-1 ${
                      isActive
                        ? "text-indigo-600"
                        : "text-gray-700 hover:text-indigo-600"
                    }`}
                    style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}
                  >
                    {link.name}
                  </button>
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-indigo-500 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </div>
              );
            })}
          </div>

          {/* ===== RIGHT SIDE BUTTONS ===== */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {user ? (
              <>
                <button
                  onClick={() => handleNavigate("admin-dashboard")}
                  className="text-sm lg:text-base font-semibold text-gray-700 hover:text-indigo-600 relative group"
                  style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}
                >
                  Dashboard
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
                </button>
                <button
                  onClick={logout}
                  className="px-4 lg:px-6 py-2 lg:py-2.5 rounded-lg bg-gradient-to-r from-rose-500 to-rose-600 text-white font-bold text-sm lg:text-base shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
                  style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNavigate("admin-login")}
                className="px-4 lg:px-6 py-2 lg:py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold text-sm lg:text-base shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
                style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}
              >
                Admin Login
              </button>
            )}
          </div>

          {/* ===== MOBILE MENU BUTTON ===== */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden text-gray-700 hover:text-indigo-600 focus:outline-none transition-colors p-2"
          >
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ===== MOBILE DROPDOWN MENU ===== */}
      {mobileMenu && (
        <div className="md:hidden bg-white shadow-lg border-t border-indigo-100">
          <div className="flex flex-col items-start space-y-1 px-3 sm:px-4 py-3">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavigate(link.page)}
                  className={`w-full text-left text-sm font-semibold transition-colors px-3 py-2.5 rounded-lg ${
                    isActive
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                  }`}
                  style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}
                >
                  {link.name}
                </button>
              );
            })}

            {user ? (
              <>
                <button
                  onClick={() => handleNavigate("admin-dashboard")}
                  className="w-full text-left text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors px-3 py-2.5 rounded-lg hover:bg-indigo-50"
                  style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenu(false);
                  }}
                  className="w-full text-left text-sm font-semibold text-rose-600 hover:text-rose-700 transition-colors px-3 py-2.5 rounded-lg hover:bg-rose-50"
                  style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNavigate("admin-login")}
                className="w-full text-left text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors px-3 py-2.5 rounded-lg hover:bg-indigo-50"
                style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}
              >
                Admin Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
