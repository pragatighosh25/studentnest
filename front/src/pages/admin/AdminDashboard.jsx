import { useEffect, useMemo, useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import StatsCard from "../../components/owner/StatsCard";
import AdminPGTable from "../admin/AdminPGTable";
import { apiFetch } from "../../utils/api";

export default function AdminDashboard() {
  const [pgs, setPGs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inquiries, setInquiries] = useState([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pgs");

  const fetchAllPGs = async () => {
    try {
      const data = await apiFetch("/admin/pgs");
      setPGs(data);
    } catch (err) {
      console.error("Failed to fetch admin PGs:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllInquiries = async () => {
    try {
      const data = await apiFetch("/admin/inquiries");
      setInquiries(data);
    } catch (err) {
      console.error("Failed to fetch inquiries:", err.message);
    } finally {
      setInquiriesLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPGs();
    fetchAllInquiries();
  }, []);

  const totalPGs = pgs.length;
  const activePGs = useMemo(() => pgs.filter((p) => p.active).length, [pgs]);

  const ownersCount = useMemo(() => {
    const ids = new Set(
      pgs.map((p) => p.ownerId?._id || p.ownerId).filter(Boolean)
    );
    return ids.size;
  }, [pgs]);

  return (
    <PageWrapper>
      <section className="min-h-screen bg-gray-50 dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 py-10">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Monitor and moderate PG listings across the platform
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-10">
            <StatsCard title="Total PGs" value={loading ? "—" : totalPGs} />
            <StatsCard title="Active PGs" value={loading ? "—" : activePGs} />
            <StatsCard title="Owners" value={loading ? "—" : ownersCount} />
            <StatsCard title="Total Inquiries" value={inquiriesLoading ? "—" : inquiries.length} />
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-zinc-800 mb-6 gap-6">
            <button
              onClick={() => setActiveTab("pgs")}
              className={`pb-3 text-sm font-medium transition border-b-2 -mb-[2px] ${
                activeTab === "pgs"
                  ? "border-blue-600 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-zinc-300"
              }`}
            >
              PG Listings
            </button>
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`pb-3 text-sm font-medium transition border-b-2 -mb-[2px] ${
                activeTab === "inquiries"
                  ? "border-blue-600 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-zinc-300"
              }`}
            >
              Student Inquiries
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "inquiries" ? (
            <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 text-gray-500 dark:text-gray-400 font-medium">
                      <th className="px-6 py-4">Student Info</th>
                      <th className="px-6 py-4">PG / Owner Info</th>
                      <th className="px-6 py-4">Inquiry Type</th>
                      <th className="px-6 py-4">Date & Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                    {inquiriesLoading ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                          Loading inquiries...
                        </td>
                      </tr>
                    ) : inquiries.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                          No inquiries logged yet.
                        </td>
                      </tr>
                    ) : (
                      inquiries.map((inquiry) => (
                        <tr key={inquiry._id} className="hover:bg-gray-50/50 dark:hover:bg-zinc-900/30 transition">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900 dark:text-white">
                              {inquiry.studentName}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              {inquiry.studentEmail}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">
                              {inquiry.studentPhone}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {inquiry.pgId ? (
                              <>
                                <div className="font-medium text-gray-900 dark:text-white">
                                  {inquiry.pgId.name}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                  Area: {inquiry.pgId.area}, {inquiry.pgId.city}
                                </div>
                                {inquiry.pgId.ownerId && (
                                  <div className="text-[11px] text-blue-600 dark:text-blue-400 mt-1">
                                    Owner: {inquiry.pgId.ownerId.name} ({inquiry.pgId.ownerId.phone})
                                  </div>
                                )}
                              </>
                            ) : (
                              <span className="text-red-500 text-xs italic">Deleted PG</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              inquiry.type === "whatsapp"
                                ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                                : "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                            }`}>
                              {inquiry.type === "whatsapp" ? "WhatsApp" : "Phone Call"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                            {new Date(inquiry.createdAt).toLocaleString(undefined, {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <AdminPGTable pgs={pgs} setPGs={setPGs} loading={loading} />
          )}
        </div>
      </section>
    </PageWrapper>
  );
}

