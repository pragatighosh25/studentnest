import PageWrapper from "../../components/PageWrapper";
import StatsCard from "../../components/owner/StatsCard";
import AdminPGTable from "../admin/AdminPGTable";

export default function AdminDashboard() {
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
            <StatsCard title="Total PGs" value="12" />
            <StatsCard title="Active PGs" value="9" />
            <StatsCard title="Owners" value="4" />
          </div>

          {/* PG Table */}
          <AdminPGTable />
        </div>
      </section>
    </PageWrapper>
  );
}
