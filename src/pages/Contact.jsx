import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import logo from "../assets/logo1.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Replace with your actual API call
      // const response = await api.post('/enquiries', formData);
      // if (response.data.success) {
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
      // }
    } catch (error) {
      console.error("Error submitting enquiry:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow flex items-center justify-center px-6 py-20 relative overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-100 rounded-full blur-3xl opacity-40"></div>

        {/* Contact Card */}
        <div className="relative z-10 flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Left Section - Contact Info */}
          <div className="flex flex-col justify-center items-center bg-gradient-to-br from-sky-50 to-red-50 p-6 md:p-10 w-full md:w-1/2">
            <div className="mb-6 transition-transform duration-500 hover:scale-105">
              <img
                src={logo}
                alt="Hi-Tech Homes Logo"
                className="h-32 w-auto object-contain drop-shadow-lg"
              />
            </div>
            <h1
              className="text-4xl font-extrabold text-gray-900 text-center leading-snug"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Get in Touch with{" "}
              <span className="text-sky-600">Hi-Tech Homes</span>
            </h1>
            <p
              className="text-gray-500 mt-4 text-center max-w-sm"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              We're here to assist you — whether you're buying, selling, or
              simply exploring your next home.
            </p>

            <div
              className="mt-8 space-y-3 text-center text-gray-700"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <p className="flex items-center justify-center gap-2">
                <Phone className="text-sky-500" size={18} /> +91 98765 43210
              </p>
              <p className="flex items-center justify-center gap-2">
                <Mail className="text-sky-500" size={18} /> info@hitechhomes.com
              </p>
              <p className="flex items-center justify-center gap-2">
                <MapPin className="text-sky-500" size={18} /> Mumbai, India
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              {[Facebook, Instagram,Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-full border border-gray-300 hover:bg-sky-600 hover:text-white transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
            <h2
              className="text-3xl font-bold text-gray-900 text-center mb-2"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Contact Us
            </h2>
            <p
              className="text-gray-500 text-center mb-8"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Fill out the form and we'll get back to you shortly
            </p>

            {submitted && (
              <div
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3 text-green-800 font-semibold"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                ✅ Message sent successfully! We'll reach out soon.
              </div>
            )}

            <div className="space-y-5">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all duration-300 text-gray-800"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all duration-300 text-gray-800"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all duration-300 text-gray-800"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
              <textarea
                rows={5}
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all duration-300 text-gray-800 resize-none"
                style={{ fontFamily: "'Inter', sans-serif" }}
              ></textarea>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-3 rounded-xl text-white font-bold text-lg transition-all duration-300 ${
                  loading
                    ? "bg-sky-400 cursor-not-allowed opacity-80"
                    : "bg-gradient-to-r from-sky-600 to-red-500 hover:shadow-xl hover:scale-[1.02]"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
