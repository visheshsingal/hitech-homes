import { useContext, useEffect, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Bed,
  Bath,
  Square,
  Home,
  Sparkles,
  X,
} from "lucide-react";
import { PropertyContext } from "../context/PropertyContext";
import Loader from "../components/Loader";

const Listings = ({ setCurrentPage, setSelectedProperty }) => {
  const {
    filteredProperties = [],
    loading,
    error,
    fetchProperties,
  } = useContext(PropertyContext);

  const [animateCards, setAnimateCards] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    priceRange: "",
    bhk: "",
  });

  useEffect(() => {
    fetchProperties();
    setTimeout(() => setAnimateCards(true), 200);
  }, []);

  // Get unique cities from properties
  const uniqueCities = [
    ...new Set(filteredProperties.map((p) => p.city)),
  ].filter(Boolean);

  // Filter properties based on search and filters
  const getFilteredProperties = () => {
    let result = filteredProperties;

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (property) =>
          property.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.address?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Location filter
    if (filters.location) {
      result = result.filter(
        (property) =>
          property.city?.toLowerCase() === filters.location.toLowerCase()
      );
    }

    // Property type filter
    if (filters.propertyType) {
      result = result.filter(
        (property) =>
          property.type?.toLowerCase() === filters.propertyType.toLowerCase()
      );
    }

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      result = result.filter((property) => {
        const price = property.price;
        if (max) {
          return price >= min && price <= max;
        } else {
          return price >= min;
        }
      });
    }

    // BHK filter
    if (filters.bhk) {
      result = result.filter(
        (property) => property.bhk?.toString() === filters.bhk
      );
    }

    return result;
  };

  const displayedProperties = getFilteredProperties();

  const clearFilters = () => {
    setFilters({
      location: "",
      propertyType: "",
      priceRange: "",
      bhk: "",
    });
    setSearchQuery("");
  };

  const activeFilterCount = [
    filters.location,
    filters.propertyType,
    filters.priceRange,
    filters.bhk,
    searchQuery,
  ].filter(Boolean).length;

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-red-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-2xl max-w-md border-2 border-red-200">
          <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Home size={32} className="text-white" />
          </div>
          <h2
            className="text-2xl font-bold text-red-600 mb-3"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Error Loading Properties
          </h2>
          <p
            className="text-gray-600 mb-6"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {error}
          </p>
          <button
            onClick={fetchProperties}
            className="px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ===== HEADER ===== */}
      <section className="relative py-12 sm:py-16 md:py-24 overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-600 to-rose-600 px-4 sm:px-6 lg:px-8">
        {/* Background Image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.4)",
          }}
        ></div>

        {/* Gradient Overlay - Minimal */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/15 via-purple-600/10 to-rose-600/15"></div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full mb-3 sm:mb-4">
            <Sparkles size={16} className="text-yellow-300 sm:w-[18px]" />
            <span
              className="text-xs sm:text-sm font-semibold text-white"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Premium Collection
            </span>
          </div>
          <h1
            className="text-2xl sm:text-3xl md:text-6xl font-extrabold text-white mb-3 sm:mb-4 drop-shadow-2xl"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Discover Your <span className="text-rose-200">Dream Property</span>
          </h1>
          <p
            className="text-xs sm:text-sm md:text-lg text-white/95 mb-4 sm:mb-6 max-w-2xl mx-auto px-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Browse through our exclusive collection of premium homes.
          </p>
          <div
            className="flex justify-center gap-2 text-white/90 text-xs sm:text-sm"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span
              onClick={() => setCurrentPage("home")}
              className="cursor-pointer hover:text-white transition-colors font-semibold hover:underline"
            >
              Home
            </span>
            <span>/</span>
            <span className="font-semibold">All Properties</span>
          </div>
        </div>
      </section>

      {/* ===== FILTER BAR ===== */}
      <section className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b-2 border-indigo-100 py-3 sm:py-5 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <div className="relative flex-1 min-w-[250px] sm:max-w-[500px]">
              <input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 border-2 border-indigo-200 rounded-xl text-xs sm:text-sm bg-indigo-50/50 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
              <Search
                className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 text-indigo-400"
                size={16}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center sm:justify-start gap-2 px-4 sm:px-5 py-2.5 sm:py-3 border-2 border-indigo-200 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 text-gray-700 font-semibold text-xs sm:text-sm hover:from-indigo-100 hover:to-purple-100 hover:border-indigo-400 transition-all relative whitespace-nowrap"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <SlidersHorizontal size={16} className="text-indigo-600 sm:w-[18px]" />
              Filters
              {activeFilterCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Filter Dropdown */}
          {showFilters && (
            <div className="mt-4 p-4 sm:p-6 bg-white rounded-xl border-2 border-indigo-200 shadow-xl animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h3
                  className="text-base sm:text-lg font-bold text-gray-900"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Filter Properties
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-xs sm:text-sm text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <X size={14} className="sm:w-4" />
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {/* Location Filter */}
                <div>
                  <label
                    className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Location
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) =>
                      setFilters({ ...filters, location: e.target.value })
                    }
                    className="w-full px-3 sm:px-4 py-2.5 border-2 border-indigo-200 rounded-xl bg-indigo-50/50 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all text-xs sm:text-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <option value="">All Locations</option>
                    {uniqueCities.map((city, idx) => (
                      <option key={idx} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Property Type Filter */}
                <div>
                  <label
                    className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Property Type
                  </label>
                  <select
                    value={filters.propertyType}
                    onChange={(e) =>
                      setFilters({ ...filters, propertyType: e.target.value })
                    }
                    className="w-full px-3 sm:px-4 py-2.5 border-2 border-indigo-200 rounded-xl bg-indigo-50/50 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all text-xs sm:text-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <option value="">All Types</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="house">House</option>
                    <option value="penthouse">Penthouse</option>
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label
                    className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Price Range
                  </label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) =>
                      setFilters({ ...filters, priceRange: e.target.value })
                    }
                    className="w-full px-3 sm:px-4 py-2.5 border-2 border-indigo-200 rounded-xl bg-indigo-50/50 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all text-xs sm:text-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <option value="">Any Price</option>
                    <option value="0-2000000">Under ₹20 Lakhs</option>
                    <option value="2000000-5000000">₹20L - ₹50L</option>
                    <option value="5000000-10000000">₹50L - ₹1 Cr</option>
                    <option value="10000000-99999999">Above ₹1 Cr</option>
                  </select>
                </div>

                {/* BHK Filter */}
                <div>
                  <label
                    className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    BHK
                  </label>
                  <select
                    value={filters.bhk}
                    onChange={(e) =>
                      setFilters({ ...filters, bhk: e.target.value })
                    }
                    className="w-full px-3 sm:px-4 py-2.5 border-2 border-indigo-200 rounded-xl bg-indigo-50/50 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all text-xs sm:text-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <option value="">Any BHK</option>
                    <option value="1">1 BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4 BHK</option>
                    <option value="5">5+ BHK</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== PROPERTIES GRID ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-gradient-to-b from-white to-indigo-50/30">
        {/* Results Count */}
        <div className="mb-4 sm:mb-6">
          <p
            className="text-gray-600 text-xs sm:text-sm font-semibold"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Showing {displayedProperties.length} of {filteredProperties.length}{" "}
            properties
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="ml-2 sm:ml-3 text-indigo-600 hover:text-indigo-700 underline"
              >
                Clear filters
              </button>
            )}
          </p>
        </div>

        {displayedProperties.length === 0 ? (
          <div className="text-center py-12 md:py-20">
            <div className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-gradient-to-br from-indigo-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <Home size={32} className="text-indigo-600 sm:w-[48px]" />
            </div>
            <h3
              className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-rose-600 bg-clip-text text-transparent mb-2"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              No properties found
            </h3>
            <p
              className="text-gray-600 mb-4 text-sm sm:text-base"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Try adjusting your search or filters.
            </p>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all text-sm sm:text-base"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {displayedProperties.map((property, idx) => (
              <article
                key={property._id}
                onClick={() => {
                  setSelectedProperty(property);
                  setCurrentPage("property-details");
                }}
                className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-indigo-200 transition-all duration-500 transform hover:-translate-y-3 cursor-pointer ${
                  animateCards
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="relative h-48 sm:h-56 md:h-60 overflow-hidden bg-gray-200">
                  <img
                    src={
                      property.images?.[0]?.url ||
                      property.images?.[0] ||
                      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600"
                    }
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-gradient-to-r from-rose-500 to-rose-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-xs shadow-2xl flex items-center gap-1 animate-pulse">
                    <Sparkles size={10} className="sm:w-3" />
                    For Sale
                  </div>

                  {/* Price on Hover */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <div className="bg-white/95 backdrop-blur-md px-3 sm:px-4 py-1 sm:py-2 rounded-full">
                      <span className="text-indigo-600 font-bold text-xs sm:text-base md:text-lg">
                        ₹{property.price?.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <div
                    className="text-lg sm:text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-rose-600 bg-clip-text text-transparent mb-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    ₹{property.price?.toLocaleString("en-IN")}
                  </div>

                  <h3
                    className="text-sm sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {property.title}
                  </h3>

                  <div className="flex items-center text-gray-500 mb-3 sm:mb-4 text-xs sm:text-sm">
                    <MapPin size={14} className="mr-1 text-rose-500 sm:w-4" />
                    <span className="font-semibold">{property.city}</span>
                  </div>

                  <div className="flex justify-between items-center gap-2 sm:gap-3 text-gray-700 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-3 sm:p-4 border border-indigo-100">
                    <div className="flex flex-col items-center">
                      <div className="bg-indigo-100 p-1.5 sm:p-2 rounded-lg mb-1">
                        <Bed size={14} className="text-indigo-600 sm:w-[18px]" />
                      </div>
                      <span className="text-xs font-bold text-gray-700">
                        {property.bhk} BHK
                      </span>
                    </div>

                    <div className="w-px h-8 sm:h-10 bg-gradient-to-b from-indigo-200 to-indigo-200"></div>

                    <div className="flex flex-col items-center">
                      <div className="bg-indigo-100 p-1.5 sm:p-2 rounded-lg mb-1">
                        <Bath size={14} className="text-indigo-600 sm:w-[18px]" />
                      </div>
                      <span className="text-xs font-bold text-gray-700">
                        {property.bathrooms || 2}
                      </span>
                    </div>

                    <div className="w-px h-8 sm:h-10 bg-gradient-to-b from-indigo-200 to-rose-200"></div>

                    <div className="flex flex-col items-center">
                      <div className="bg-indigo-100 p-1.5 sm:p-2 rounded-lg mb-1">
                        <Square size={14} className="text-indigo-600 sm:w-[18px]" />
                      </div>
                      <span className="text-xs font-bold text-gray-700">
                        {property.area || 1200} sqft
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Listings;
