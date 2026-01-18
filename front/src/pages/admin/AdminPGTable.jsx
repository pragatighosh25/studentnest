import { useMemo, useState } from "react";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  ShieldOff,
  Trash2,
  Search,
} from "lucide-react";
import AdminPGDetailsModal from "./AdminPGDetailsModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import Select from "../../components/Select";
import { apiFetch } from "../../utils/api";

const GENDER_STYLE = {
  Boys: "bg-blue-100 text-blue-700 dark:bg-blue-900/40",
  Girls: "bg-pink-100 text-pink-700 dark:bg-pink-900/40",
  "Co-ed": "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200",
};

const STATUS_OPTIONS = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

const VERIFY_OPTIONS = [
  { label: "All Verifications", value: "all" },
  { label: "Verified", value: "verified" },
  { label: "Unverified", value: "unverified" },
];

export default function AdminPGTable({ pgs, setPGs, loading }) {
  const [selectedPG, setSelectedPG] = useState(null);

  // 🔍 search + filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [verifyFilter, setVerifyFilter] = useState("all");

  // 🗑 delete modal state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const updatePGInState = (updated) => {
    setPGs((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
    setSelectedPG((prev) => (prev?._id === updated._id ? updated : prev));
  };

  /* ---------- VERIFY / UNVERIFY ---------- */
  const toggleVerified = async (pg) => {
    try {
      const updated = await apiFetch(`/admin/pgs/${pg._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verified: !pg.verified }),
      });

      updatePGInState(updated);
    } catch (err) {
      console.error("Verify failed:", err.message);
    }
  };

  /* ---------- ACTIVE / INACTIVE ---------- */
  const toggleActive = async (pg) => {
    try {
      const updated = await apiFetch(`/admin/pgs/${pg._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !pg.active }),
      });

      updatePGInState(updated);
    } catch (err) {
      console.error("Toggle failed:", err.message);
    }
  };

  /* ---------- DELETE ---------- */
  const confirmDelete = (pg) => setDeleteTarget(pg);

  const deletePG = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);
      await apiFetch(`/admin/pgs/${deleteTarget._id}`, { method: "DELETE" });

      setPGs((prev) => prev.filter((p) => p._id !== deleteTarget._id));
      setSelectedPG(null);
      setDeleteTarget(null);
    } catch (err) {
      console.error("Delete failed:", err.message);
    } finally {
      setDeleting(false);
    }
  };

  const filteredPGs = useMemo(() => {
    const q = search.toLowerCase().trim();

    return (pgs || []).filter((pg) => {
      const name = (pg.name || "").toLowerCase();
      const city = (pg.city || "").toLowerCase();
      const owner = (pg.ownerId?.name || "").toLowerCase();

      const matchesSearch = q
        ? name.includes(q) || city.includes(q) || owner.includes(q)
        : true;

      const matchesStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "active"
          ? pg.active
          : !pg.active;

      const matchesVerify =
        verifyFilter === "all"
          ? true
          : verifyFilter === "verified"
          ? pg.verified
          : !pg.verified;

      return matchesSearch && matchesStatus && matchesVerify;
    });
  }, [pgs, search, statusFilter, verifyFilter]);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">Loading PGs...</div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
      {/* 🔍 Search + Filters */}
      <div className="p-4 border-b border-gray-200 dark:border-zinc-800 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        {/* Search */}
        <div className="flex items-center gap-2 w-full md:max-w-sm rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by PG, city, owner..."
            className="w-full bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <div className="w-44">
            <Select
              label="All Status"
              value={
                STATUS_OPTIONS.find((o) => o.value === statusFilter)?.label ||
                ""
              }
              options={STATUS_OPTIONS}
              onChange={(val) => setStatusFilter(val)}
            />
          </div>

          <div className="w-52">
            <Select
              label="All Verifications"
              value={
                VERIFY_OPTIONS.find((o) => o.value === verifyFilter)?.label ||
                ""
              }
              options={VERIFY_OPTIONS}
              onChange={(val) => setVerifyFilter(val)}
            />
          </div>

          {(search || statusFilter !== "all" || verifyFilter !== "all") && (
            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
                setVerifyFilter("all");
              }}
              className="rounded-xl border border-gray-200 dark:border-zinc-800 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-zinc-800">
            <tr>
              <th className="px-4 py-3 text-left dark:text-gray-400">PG</th>
              <th className="px-4 py-3 text-left dark:text-gray-400">Owner</th>
              <th className="px-4 py-3 text-left dark:text-gray-400">Gender</th>
              <th className="px-4 py-3 text-left dark:text-gray-400">Rent</th>
              <th className="px-4 py-3 text-left dark:text-gray-400">Status</th>
              <th className="px-4 py-3 text-right dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredPGs.map((pg) => (
              <tr
                key={pg._id}
                onClick={() => setSelectedPG(pg)}
                className="border-t border-gray-200 dark:border-zinc-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition"
              >
                {/* PG */}
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900 dark:text-gray-200">
                    {pg.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {pg.area}, {pg.city}
                  </div>
                </td>

                {/* OWNER */}
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {pg.ownerId?.name || "—"}
                </td>

                {/* GENDER */}
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      GENDER_STYLE[pg.gender] ||
                      "bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-gray-300"
                    }`}
                  >
                    {pg.gender || "—"}
                  </span>
                </td>

                {/* RENT */}
                <td className="px-4 py-3 text-gray-900 dark:text-gray-200">
                  ₹{pg.rent}
                </td>

                {/* STATUS */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-medium ${
                        pg.active ? "text-green-600" : "text-gray-400"
                      }`}
                    >
                      {pg.active ? "Active" : "Inactive"}
                    </span>

                    {pg.verified && (
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200">
                        Verified
                      </span>
                    )}
                  </div>
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleVerified(pg);
                      }}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                      title={pg.verified ? "Unverify PG" : "Verify PG"}
                    >
                      {pg.verified ? (
                        <ShieldCheck className="h-4 w-4 text-blue-600" />
                      ) : (
                        <ShieldOff className="h-4 w-4 text-gray-500" />
                      )}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleActive(pg);
                      }}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                      title={
                        pg.active ? "Hide from students" : "Show to students"
                      }
                    >
                      {pg.active ? (
                        <Eye className="h-4 w-4 text-green-600" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      )}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        confirmDelete(pg);
                      }}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                      title="Delete PG"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty */}
        {filteredPGs.length === 0 && (
          <div className="py-10 text-center text-gray-500">
            No PGs found for current filters
          </div>
        )}
      </div>

      {/* Details modal */}
      {selectedPG && (
        <AdminPGDetailsModal
          pg={selectedPG}
          onClose={() => setSelectedPG(null)}
        />
      )}

      {/* Delete confirm modal */}
      <DeleteConfirmModal
        open={Boolean(deleteTarget)}
        title="Delete this PG?"
        description={`This will permanently remove "${
          deleteTarget?.name || "this PG"
        }" from the platform.`}
        loading={deleting}
        onClose={() => setDeleteTarget(null)}
        onConfirm={deletePG}
      />
    </div>
  );
}
