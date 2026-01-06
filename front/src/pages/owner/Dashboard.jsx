import { useState } from "react";
import { Plus } from "lucide-react";
import PageWrapper from "../../components/PageWrapper";
import StatsCard from "../../components/owner/StatsCard";
import PGTable from "../../components/owner/PGTable";
import AddPGModal from "../../components/owner/AddPGModal";
import PGFormModal from "../../components/owner/PGFormModal";

export default function OwnerDashboard() {
  const [open, setOpen] = useState(false);

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
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
            >
              <Plus className="h-4 w-4" />
              Add PG
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <StatsCard title="Total PGs" value="3" />
            <StatsCard title="Active Listings" value="2" />
            <StatsCard title="Inquiries" value="12" />
          </div>

          {/* PG Table */}
          <PGTable />

          {/* Modal */}
          {open && <PGFormModal onClose={() => setOpen(false)} />}
        </div>
      </section>
    </PageWrapper>
  );
}
