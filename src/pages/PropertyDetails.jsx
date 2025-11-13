import { useState } from "react";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  ChevronRight,
  Phone,
  Mail,
  Wifi,
  Car,
  Dumbbell,
  Shield,
  Send,
  Home as HomeIcon,
  Sparkles,
  Camera,
  Heart,
  Share2,
} from "lucide-react";
import api from "../utils/api";

const PropertyDetails = ({ property, setCurrentPage }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/enquiries", {
        ...formData,
        propertyId: property._id,
      });
      if (response.data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (error) {
      console.error("Error submitting enquiry:", error);
    }
    setLoading(false);
  };

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-red-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-2xl max-w-md border-2 border-sky-200">
          <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <HomeIcon size={32} className="text-white" />
          </div>
          <h2
            className="text-2xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Property Not Found
          </h2>
          <p
            className="text-gray-600 mb-6"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            The property you're looking for doesn't exist.
          </p>
          <button
            onClick={() => setCurrentPage("listings")}
            className="px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            View All Properties
          </button>
        </div>
      </div>
    );
  }

  const defaultAmenities = property.amenities || [
    "Swimming Pool",
    "Gym",
    "Parking",
    "Security",
    "24/7 Water",
    "Power Backup",
  ];

  return (
    <div
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="bg-gradient-to-b from-indigo-50/30 to-white"
    >
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-600 to-rose-600 px-4 sm:px-6 lg:px-8">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-24 sm:w-48 md:w-96 h-24 sm:h-48 md:h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-0 right-0 w-24 sm:w-48 md:w-96 h-24 sm:h-48 md:h-96 bg-rose-400/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 sm:w-32 md:w-64 h-16 sm:h-32 md:h-64 bg-indigo-300/20 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`,
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-4">
            <Sparkles size={18} className="text-yellow-300" />
            <span
              className="text-sm font-semibold"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Property Details
            </span>
          </div>

          <h1
            className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-3 md:mb-4 drop-shadow-2xl"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Your <span className="text-rose-200">Dream Home</span> Awaits
          </h1>
          <p
            className="text-base md:text-lg text-white/95 leading-relaxed drop-shadow-lg max-w-2xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Explore every detail of this exceptional property and take the first
            step towards making it yours.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="bg-white border-b-2 border-indigo-100 py-3 md:py-4 sticky top-20 z-30 backdrop-blur-md bg-white/95 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className="flex items-center gap-2 flex-wrap text-xs sm:text-sm"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span
              onClick={() => setCurrentPage("home")}
              className="text-gray-600 cursor-pointer hover:text-indigo-600 transition-colors font-medium"
            >
              Home
            </span>
            <ChevronRight size={14} className="text-gray-400 sm:w-4" />
            <span
              onClick={() => setCurrentPage("listings")}
              className="text-gray-600 cursor-pointer hover:text-indigo-600 transition-colors font-medium"
            >
              Properties
            </span>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="text-gray-900 font-semibold text-sm line-clamp-1">
              {property.title}
            </span>
          </nav>
        </div>
      </section>

      {/* Gallery with Borders */}
      <section className="py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 md:gap-4">
            {/* Main Image/Video */}
            <div className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-lg md:rounded-2xl border-2 md:border-4 border-indigo-200 shadow-lg md:shadow-xl group bg-gray-100">
              {property.video?.url ? (
                <video
                  src={property.video.url}
                  controls
                  className="w-full h-full object-cover min-h-[250px] sm:min-h-[400px] md:min-h-[600px]"
                />
              ) : (
                <img
                  src={
                    property.images?.[0]?.url ||
                    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"
                  }
                  alt={property.title}
                  className="w-full h-full object-cover min-h-[250px] sm:min-h-[400px] md:min-h-[600px] group-hover:scale-110 transition-transform duration-700"
                />
              )}
              {/* Featured Badge */}
              <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-gradient-to-r from-rose-500 to-rose-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full font-bold text-xs shadow-2xl flex items-center gap-1 animate-pulse">
                <Sparkles size={12} className="md:w-[14px]" />
                Featured
              </div>
            </div>

            {/* Additional Images with Borders */}
            {property.images?.slice(1, 5).map((image, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-lg md:rounded-xl border-2 md:border-3 border-indigo-200 shadow-md md:shadow-lg group bg-gray-100 h-[140px] md:h-[290px]"
              >
                <img
                  src={image.url}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}

            {/* Placeholder if less than 5 images */}
            {[
              ...Array(Math.max(0, 4 - (property.images?.length - 1 || 0))),
            ].map((_, i) => (
              <div
                key={`placeholder-${i}`}
                className="relative overflow-hidden rounded-lg md:rounded-xl border-2 md:border-3 border-indigo-100 shadow-md md:shadow-lg bg-gradient-to-br from-indigo-50 to-gray-50 h-[140px] md:h-[290px] flex items-center justify-center"
              >
                <HomeIcon size={32} className="text-indigo-200 md:w-[48px]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Details Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Header */}
            <div className="bg-white rounded-xl md:rounded-2xl p-5 md:p-8 shadow-lg md:shadow-xl border-2 border-indigo-100 mb-4 md:mb-6">
              <span
                className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-bold text-xs mb-4 shadow-lg"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                For Sale
              </span>
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {property.title}
              </h1>
              <div
                className="flex items-center gap-2 text-gray-600 text-base md:text-lg mb-6"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <MapPin size={20} className="text-red-500" />
                <span className="font-semibold">
                  {property.address || property.city}
                </span>
              </div>

              <div className="flex flex-wrap gap-6 pt-6 border-t-2 border-sky-100">
                {[
                  {
                    icon: <Bed size={28} />,
                    value: property.bhk,
                    label: "Bedrooms",
                    color: "from-sky-500 to-sky-600",
                  },
                  {
                    icon: <Bath size={28} />,
                    value: property.bathrooms || 2,
                    label: "Bathrooms",
                    color: "from-blue-500 to-blue-600",
                  },
                  {
                    icon: <Square size={28} />,
                    value: property.area || 1200,
                    label: "Sq. Ft.",
                    color: "from-red-500 to-red-600",
                  },
                ].map((meta, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-gradient-to-br from-sky-50 to-white rounded-xl p-4 border-2 border-sky-100 flex-1 min-w-[140px]"
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${meta.color} text-white rounded-xl flex items-center justify-center shadow-lg`}
                    >
                      {meta.icon}
                    </div>
                    <div>
                      <div
                        className="text-2xl font-extrabold text-gray-900"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {meta.value}
                      </div>
                      <div
                        className="text-xs text-gray-600 font-semibold"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {meta.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border-2 border-sky-100 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-8 bg-gradient-to-b from-sky-500 to-red-500 rounded-full"></div>
                <h2
                  className="text-2xl font-bold text-gray-900"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Property Description
                </h2>
              </div>
              <p
                className="text-gray-700 leading-relaxed text-base"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {property.description ||
                  "Beautiful property with modern amenities and excellent location. This stunning residence offers spacious living areas, high-quality finishes, and a prime location close to schools, shopping, and entertainment. Perfect for families looking for comfort and convenience in a prestigious neighborhood."}
              </p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border-2 border-sky-100">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-sky-500 to-red-500 rounded-full"></div>
                <h2
                  className="text-2xl font-bold text-gray-900"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Features & Amenities
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {defaultAmenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-sky-50 to-white rounded-xl border-2 border-sky-100 hover:border-sky-300 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-600 text-white rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
                      {idx % 4 === 0 ? (
                        <Wifi size={20} />
                      ) : idx % 4 === 1 ? (
                        <Dumbbell size={20} />
                      ) : idx % 4 === 2 ? (
                        <Car size={20} />
                      ) : (
                        <Shield size={20} />
                      )}
                    </div>
                    <span
                      className="font-semibold text-gray-800 text-sm"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-white rounded-2xl p-6 shadow-2xl border-2 border-sky-100">
              {/* Price Card */}
              <div className="text-center p-6 bg-gradient-to-br from-sky-500 via-sky-600 to-red-600 rounded-xl mb-6 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                <div className="relative z-10">
                  <span
                    className="text-4xl md:text-5xl font-black text-white block mb-1"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    ₹{property.price?.toLocaleString("en-IN")}
                  </span>
                  <span
                    className="text-white/90 text-sm font-semibold"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Total Price
                  </span>
                </div>
              </div>

              <h2
                className="text-xl font-bold mb-4 text-gray-900"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Send Enquiry
              </h2>

              {submitted ? (
                <div
                  className="p-4 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-500 rounded-xl text-green-800"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <p className="font-bold mb-1 flex items-center gap-2">
                    <Sparkles size={16} />
                    Thank you!
                  </p>
                  <p className="text-sm">
                    Your enquiry has been submitted successfully.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    {
                      label: "Your Name",
                      type: "text",
                      value: formData.name,
                      field: "name",
                      placeholder: "Enter your name",
                    },
                    {
                      label: "Email",
                      type: "email",
                      value: formData.email,
                      field: "email",
                      placeholder: "your@email.com",
                    },
                    {
                      label: "Phone",
                      type: "tel",
                      value: formData.phone,
                      field: "phone",
                      placeholder: "+91 98765 43210",
                    },
                  ].map((input, idx) => (
                    <div key={idx}>
                      <label
                        className="block font-semibold text-gray-700 text-sm mb-2"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {input.label}
                      </label>
                      <input
                        type={input.type}
                        placeholder={input.placeholder}
                        value={input.value}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [input.field]: e.target.value,
                          })
                        }
                        required
                        className="w-full px-4 py-3 border-2 border-sky-200 rounded-xl text-sm focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-100 transition-all bg-sky-50/50 focus:bg-white"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      />
                    </div>
                  ))}

                  <div>
                    <label
                      className="block font-semibold text-gray-700 text-sm mb-2"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Message
                    </label>
                    <textarea
                      placeholder="I'm interested in this property..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full min-h-[100px] px-4 py-3 border-2 border-sky-200 rounded-xl text-sm resize-vertical focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-100 transition-all bg-sky-50/50 focus:bg-white"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white border-none rounded-xl font-bold text-base cursor-pointer transition-all flex items-center justify-center gap-2 hover:from-sky-600 hover:to-sky-700 hover:shadow-xl hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <Send size={20} />
                    {loading ? "Sending..." : "Submit Enquiry"}
                  </button>
                </form>
              )}

              <div className="mt-6 pt-6 border-t-2 border-sky-100 space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-sky-50 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 bg-gradient-to-br from-sky-100 to-sky-200 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone size={18} className="text-sky-600" />
                  </div>
                  <span
                    className="text-gray-700 text-sm font-semibold"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    +91 98765 43210
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-sky-50 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail size={18} className="text-red-600" />
                  </div>
                  <span
                    className="text-gray-700 text-sm font-semibold"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    info@hitechhomes.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
