import { Target, Eye, Award, Heart, Home, Sparkles } from "lucide-react";

const About = ({ setCurrentPage }) => {
  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      {/* Hero Section with Background Image */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-700 to-rose-600">
        {/* Background Image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.45)",
          }}
        ></div>

        {/* Gradient Overlay - Minimal */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/15 via-purple-600/10 to-rose-600/15"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-4">
            <Sparkles size={18} className="text-yellow-300" />
            <span className="text-sm font-semibold">Our Story</span>
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-2xl"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            About <span className="text-rose-200">Hi-Tech Homes</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-xl text-white/95 leading-relaxed drop-shadow-lg max-w-3xl mx-auto">
            Turning Transactions into Relationships — Building trust and
            creating lasting partnerships in real estate.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Mission */}
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
                <Target size={32} />
              </div>
              <h2
                className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Our Mission
              </h2>
              <p className="text-base text-gray-700 leading-relaxed mb-6">
                To revolutionize the real estate industry by providing
                exceptional service, cutting-edge technology, and personalized
                attention to every client. We believe that buying or selling a
                property is not just a transaction—it's a life-changing decision
                that deserves expert guidance and care.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800"
                alt="Mission"
                className="rounded-3xl shadow-2xl w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-sky-200 rounded-full opacity-30 blur-2xl"></div>
            </div>
          </div>

          {/* Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
                alt="Vision"
                className="rounded-3xl shadow-2xl w-full h-[400px] object-cover"
              />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-red-200 rounded-full opacity-30 blur-2xl"></div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
                <Eye size={32} />
              </div>
              <h2
                className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Our Vision
              </h2>
              <p className="text-base text-gray-700 leading-relaxed mb-6">
                To be the most trusted and innovative real estate company, known
                for turning transactions into lasting relationships. We envision
                a future where finding your dream home is seamless, transparent,
                and exciting, powered by technology and driven by genuine care
                for our clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-sky-100 px-4 py-2 rounded-full mb-3">
              <Heart size={16} className="text-red-600" />
              <span className="text-sm font-bold text-red-700">
                Core Values
              </span>
            </div>
            <h2
              className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-red-600 to-sky-600 bg-clip-text text-transparent"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Our Core Values
            </h2>
            <p className="text-base text-gray-600">What drives us every day</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Trust",
                desc: "Building lasting relationships through transparency and honesty",
                img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400",
                icon: <Heart size={24} />,
                gradient: "from-sky-500 to-sky-600",
              },
              {
                title: "Excellence",
                desc: "Delivering outstanding service and exceeding expectations",
                img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400",
                icon: <Award size={24} />,
                gradient: "from-red-500 to-red-600",
              },
              {
                title: "Innovation",
                desc: "Embracing technology to simplify the real estate experience",
                img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400",
                icon: <Home size={24} />,
                gradient: "from-sky-600 to-red-500",
              },
            ].map((value, idx) => (
              <div key={idx} className="text-center">
                <div className="relative inline-block mb-6 group">
                  <img
                    src={value.img}
                    alt={value.title}
                    className="rounded-full w-48 h-48 object-cover mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300 border-4 border-sky-100"
                  />
                  <div
                    className={`absolute -bottom-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg bg-gradient-to-br ${value.gradient}`}
                  >
                    {value.icon}
                  </div>
                </div>
                <h3
                  className="text-2xl font-bold text-gray-900 mb-3"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {value.title}
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-sky-500 via-sky-600 to-red-600 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-4">
            <Sparkles size={16} className="text-yellow-300" />
            <span className="text-sm font-bold">Get Started</span>
          </div>

          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg mb-8 text-white/95">
            Let us help you find your dream property today.
          </p>
          <button
            onClick={() => setCurrentPage && setCurrentPage("contact")}
            className="px-8 py-3 bg-white text-sky-600 font-bold rounded-full shadow-2xl hover:shadow-white/50 hover:scale-105 transition-all"
          >
            Contact Us Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
