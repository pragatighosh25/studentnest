import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import PageWrapper from "../../components/PageWrapper";
import StatsCard from "../../components/owner/StatsCard";
import PGTable from "../../components/owner/PGTable";
import PGFormModal from "../../components/owner/PGFormModal";
import { apiFetch } from "../../utils/api";

export default function OwnerDashboard() {
  const [pgs, setPGs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingPG, setEditingPG] = useState(null);

  const fetchPGs = async () => {
    try {
      const data = await apiFetch("/owner/pgs");
      setPGs(data);
    } catch (err) {
      console.error("Failed to fetch PGs", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPGs();
  }, []);

  return (
    <PageWrapper>
      <section className="min-h-screen bg-gray-50 dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 py-10">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Owner Dashboard
            </h1>

            <button
              onClick={() => {
                setEditingPG(null);
                setOpen(true);
              }}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
            >
              <Plus className="h-4 w-4" />
              Add PG
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <StatsCard title="Total PGs" value={pgs.length} />
            <StatsCard
              title="Active Listings"
              value={pgs.filter((p) => p.active).length}
            />
            <StatsCard title="Inquiries" value="—" />
          </div>

          {/* PG Table */}

          {loading ? (
            <p className="text-gray-500">Loading PGs...</p>
          ) : (
            <PGTable
              pgs={pgs}
              onEdit={(pg) => {
                setEditingPG(pg);
                setOpen(true);
              }}
              onRefresh={fetchPGs}
            />
          )}

          {/* Modal */}
{open && (
  <PGFormModal
    pg={editingPG}
    onClose={() => {
      setOpen(false);
      setEditingPG(null);
    }}
    onSuccess={(savedPg, isEdit) => {
      setPGs((prev) => {
        if (isEdit) {
          return prev.map((p) => (p._id === savedPg._id ? savedPg : p));
        }
        return [savedPg, ...prev];
      });
    }}
  />
)}

        </div>
      </section>
    </PageWrapper>
  );
}
