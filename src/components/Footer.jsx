import {
  Facebook,
  Instagram,
  Linkedin,
  X,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import logo from "../assets/logo1.png";

export default function Footer({ setCurrentPage }) {
  const currentYear = new Date().getFullYear();

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 pt-12 md:pt-16 pb-6 md:pb-8 mt-16 md:mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {/* ===== BRAND SECTION ===== */}
        <div className="text-center sm:text-left">
          <div
            onClick={() => handleNavigate("home")}
            className="mb-4 cursor-pointer hover:scale-[1.02] transition-all inline-block w-full sm:w-auto"
          >
            <img
              src={logo}
              alt="Hi-Tech Homes Logo"
              className="h-12 md:h-16 w-auto object-contain mx-auto sm:mx-0"
            />
          </div>
          <p
            className="text-gray-400 leading-relaxed text-sm md:text-base"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Building dreams into reality. Explore premium properties designed
            for comfort, style, and innovation — where luxury meets lifestyle.
          </p>
        </div>

        {/* ===== QUICK LINKS ===== */}
        <div className="text-center sm:text-left">
          <h3
            className="text-base md:text-lg font-semibold text-white mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Quick Links
          </h3>
          <ul
            className="space-y-2 md:space-y-2.5"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {[
              { label: "Home", page: "home" },
              { label: "Listings", page: "listings" },
              { label: "About", page: "about" },
              { label: "Contact", page: "contact" },
            ].map((link) => (
              <li key={link.page}>
                <button
                  onClick={() => handleNavigate(link.page)}
                  className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-sm md:text-base"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* ===== CONTACT INFO ===== */}
        <div className="text-center sm:text-left">
          <h3
            className="text-base md:text-lg font-semibold text-white mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Contact Us
          </h3>
          <ul
            className="space-y-2 md:space-y-3 text-gray-400 text-sm md:text-base"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <li className="flex items-start sm:items-center gap-2 justify-center sm:justify-start">
              <MapPin size={16} className="text-indigo-400 flex-shrink-0 mt-0.5 sm:mt-0 md:w-[18px]" />
              <span>123 Skyline Avenue, Mumbai, India</span>
            </li>
            <li className="flex items-center gap-2 justify-center sm:justify-start">
              <Phone size={16} className="text-indigo-400 md:w-[18px]" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-2 justify-center sm:justify-start">
              <Mail size={16} className="text-indigo-400 md:w-[18px]" />
              <span>info@hitechhomes.com</span>
            </li>
          </ul>
        </div>

        {/* ===== SOCIAL MEDIA ===== */}
        <div className="text-center sm:text-left">
          <h3
            className="text-base md:text-lg font-semibold text-white mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Connect With Us
          </h3>
          <div className="flex space-x-3 md:space-x-4 justify-center sm:justify-start mb-4">
            {[Facebook, Instagram, X].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="p-2.5 rounded-full border border-gray-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300"
              >
                <Icon size={16} className="md:w-[18px]" />
              </a>
            ))}
          </div>
          <p
            className="text-gray-500 text-xs md:text-sm leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Stay connected for new listings, offers, and real estate updates.
          </p>
        </div>
      </div>

      {/* ===== DIVIDER / COPYRIGHT ===== */}
      <div
        className="border-t border-gray-800 mt-8 md:mt-12 pt-4 md:pt-6 text-center text-xs md:text-sm text-gray-500 px-4"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        © {currentYear}{" "}
        <span className="font-medium text-gray-400">Hi-Tech Homes</span>. All
        rights reserved.
      </div>
    </footer>
  );
}
