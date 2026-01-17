import { useEffect, useMemo, useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import StatsCard from "../../components/owner/StatsCard";
import AdminPGTable from "../admin/AdminPGTable";
import { apiFetch } from "../../utils/api";

export default function AdminDashboard() {
  const [pgs, setPGs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchAllPGs();
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <StatsCard title="Total PGs" value={loading ? "—" : totalPGs} />
            <StatsCard title="Active PGs" value={loading ? "—" : activePGs} />
            <StatsCard title="Owners" value={loading ? "—" : ownersCount} />
          </div>

          {/* PG Table */}
          <AdminPGTable pgs={pgs} setPGs={setPGs} loading={loading} />
        </div>
      </section>
    </PageWrapper>
  );
}

