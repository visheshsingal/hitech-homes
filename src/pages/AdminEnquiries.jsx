import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import api from "../utils/api";
import Loader from "../components/Loader";

const AdminEnquiries = ({ setCurrentPage }) => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchEnquiries = async (p = 1) => {
    setLoading(true);
    try {
      const res = await api.get(`/enquiries?page=${p}&limit=25`);
      if (res.data.success) {
        setEnquiries(res.data.data || []);
        setTotal(res.data.total || 0);
      }
    } catch (err) {
      console.error("Failed to fetch enquiries:", err);
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.clear();
        setCurrentPage("admin-login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries(page);
  }, [page]);

  const handleStatus = async (id, status) => {
    if (!window.confirm("Change status?")) return;
    try {
      const res = await api.put(`/enquiries/${id}/status`, { status });
      if (res.data.success) fetchEnquiries(page);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;
    try {
      const res = await api.delete(`/enquiries/${id}`);
      if (res.data.success) fetchEnquiries(page);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete enquiry");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-sky-50 to-red-50">
      <AdminSidebar currentPage="admin-enquiries" setCurrentPage={setCurrentPage} />
      <div className="flex-1 p-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Enquiries</h1>
          <div className="text-sm text-gray-600">Total: {total}</div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          {loading ? (
            <Loader />
          ) : enquiries.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No enquiries found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs text-gray-600 uppercase">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Property</th>
                    <th className="px-4 py-3">Message</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {enquiries.map((enq) => (
                    <tr key={enq._id} className="align-top">
                      <td className="px-4 py-3">{enq.name}</td>
                      <td className="px-4 py-3">{enq.email}</td>
                      <td className="px-4 py-3">{enq.phone}</td>
                      <td className="px-4 py-3">{enq.propertyId?.title || '—'}</td>
                      <td className="px-4 py-3 max-w-xl">{enq.message}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs ${enq.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : enq.status === 'contacted' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                          {enq.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleStatus(enq._id, 'contacted')} className="px-3 py-1 bg-blue-600 text-white rounded">Contacted</button>
                          <button onClick={() => handleStatus(enq._id, 'closed')} className="px-3 py-1 bg-green-600 text-white rounded">Close</button>
                          <button onClick={() => handleDelete(enq._id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEnquiries;
