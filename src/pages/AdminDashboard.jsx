import { useContext, useEffect, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Building2,
  Search,
  LogOut,
  AlertCircle,
} from "lucide-react";
import { PropertyContext } from "../context/PropertyContext";
import AdminSidebar from "../components/AdminSidebar";
import DashboardStats from "../components/DashboardStats";
import Loader from "../components/Loader";
import api from "../utils/api";

const AdminDashboard = ({ setCurrentPage }) => {
  const { properties, fetchProperties } = useContext(PropertyContext);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [authChecked, setAuthChecked] = useState(false);
  const [enquiryStats, setEnquiryStats] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("❌ No token found - redirecting to login");
      setTimeout(() => {
        alert("Please login to access the dashboard");
        setCurrentPage("login");
      }, 100);
    } else {
      console.log("✅ Token found:", token.substring(0, 30) + "...");
      fetchProperties();
      // fetch enquiry stats for dashboard
      (async () => {
        try {
          const res = await api.get('/enquiries/stats');
          setEnquiryStats(res.data.data);
        } catch (err) {
          console.warn('Could not fetch enquiry stats', err?.response?.data || err.message);
        }
      })();
    }

    setAuthChecked(true);
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      alert("Logged out successfully!");
      setCurrentPage("login");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      setLoading(true);
      try {
        const response = await api.delete(`/properties/${id}`);
        console.log("✅ Delete response:", response.data);

        await fetchProperties();
        alert("Property deleted successfully!");
      } catch (error) {
        console.error("❌ Delete Error:", {
          status: error.response?.status,
          message: error.response?.data?.message,
          fullError: error,
        });

        if (error.response?.status === 401) {
          alert("Session expired. Please login again.");
          localStorage.clear();
          setCurrentPage("login");
        } else {
          alert(
            `Failed to delete: ${
              error.response?.data?.message || error.message
            }`
          );
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredProperties = properties.filter(
    (property) =>
      property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-50 to-red-50">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-sky-50 to-red-50">
      <AdminSidebar
        currentPage="admin-dashboard"
        setCurrentPage={setCurrentPage}
      />
      <div className="flex-1 p-8">
        {/* Auth Warning Banner */}
        {!localStorage.getItem("token") && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span className="font-semibold">Not Authenticated!</span>
            <button
              onClick={() => setCurrentPage("login")}
              className="ml-auto bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
            >
              Go to Login
            </button>
          </div>
        )}

        {/* Header Section - Centered */}
        <div className="mb-8">
          <div className="flex flex-col items-center justify-center text-center mb-6">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-5xl font-black bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <button
                onClick={handleLogout}
                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all"
                title="Logout"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-600 text-lg">
              Manage your properties and view statistics
            </p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => setCurrentPage("add-property")}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Add New Property
            </button>
          </div>
        </div>

        <DashboardStats properties={properties} />
  {/* pass enquiry stats so DashboardStats shows live data */}
  <DashboardStats properties={properties} enquiries={enquiryStats} />

        {/* Properties Table Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                All Properties
              </h2>
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all w-64"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <Loader />
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No properties found
              </h3>
              <p className="text-gray-500">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Start by adding your first property"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Property
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      City
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      BHK
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredProperties.map((property) => (
                    <tr
                      key={property._id}
                      className="hover:bg-blue-50 transition-colors duration-200 group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              property.image ||
                              "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100"
                            }
                            alt={property.title}
                            className="w-16 h-16 rounded-lg object-cover shadow-md"
                          />
                          <span className="font-semibold text-gray-900">
                            {property.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-700 font-medium">
                          {property.city}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-red-600 text-lg">
                          ₹{property.price?.toLocaleString("en-IN")}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {property.bhk} BHK
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200"
                            title="Edit property"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(property._id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200"
                            title="Delete property"
                            disabled={loading}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Property Count */}
          {filteredProperties.length > 0 && (
            <div className="mt-6 text-sm text-gray-600 text-center">
              Showing {filteredProperties.length} of {properties.length}{" "}
              properties
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
