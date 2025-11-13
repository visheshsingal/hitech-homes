import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function AdminEnquiries({ setCurrentPage }) {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCurrentPage && setCurrentPage('admin-enquiries');

    const fetchEnquiries = async () => {
      try {
        setLoading(true);
        const res = await api.get('/enquiries');
        setEnquiries(res.data.data || []);
      } catch (err) {
        console.error('Failed to fetch enquiries', err);
        setError(err.response?.data?.message || err.message || 'Failed to load enquiries');
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, [setCurrentPage]);

  if (loading) return <div className="p-6">Loading enquiries…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Enquiries</h2>
      {enquiries.length === 0 ? (
        <div>No enquiries found.</div>
      ) : (
        <div className="overflow-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="text-left">
                <th className="px-2 py-1">Name</th>
                <th className="px-2 py-1">Email</th>
                <th className="px-2 py-1">Phone</th>
                <th className="px-2 py-1">Message</th>
                <th className="px-2 py-1">Property</th>
                <th className="px-2 py-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((e) => (
                <tr key={e._id} className="border-t">
                  <td className="px-2 py-2">{e.name}</td>
                  <td className="px-2 py-2">{e.email}</td>
                  <td className="px-2 py-2">{e.phone}</td>
                  <td className="px-2 py-2 max-w-xs truncate">{e.message}</td>
                  <td className="px-2 py-2">{e.propertyId?.title || '—'}</td>
                  <td className="px-2 py-2">{e.status || 'pending'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
