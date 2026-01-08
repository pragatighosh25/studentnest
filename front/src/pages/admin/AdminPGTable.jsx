import { Eye, ShieldCheck, ShieldOff } from "lucide-react";
import { useEffect, useState } from "react";
import AdminPGDetailsModal from "./AdminPGDetailsModal";
import { apiFetch } from "../../utils/api";

const GENDER_STYLE = {
  Boys: "bg-blue-100 text-blue-700 dark:bg-blue-900/40",
  Girls: "bg-pink-100 text-pink-700 dark:bg-pink-900/40",
  "Co-ed": "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200",
};

export default function AdminPGTable() {
  const [pgs, setPGs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPG, setSelectedPG] = useState(null);

  /* ---------- FETCH ALL PGs (ADMIN) ---------- */
  useEffect(() => {
    const fetchPGs = async () => {
      try {
        const data = await apiFetch("/admin/pgs");
        setPGs(data);
      } catch (err) {
        console.error("Failed to fetch PGs:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPGs();
  }, []);

  /* ---------- VERIFY / UNVERIFY PG ---------- */
  const toggleVerified = async (id) => {
    try {
      const updated = await apiFetch(`/admin/pgs/${id}/verify`, {
        method: "PATCH",
      });

      setPGs((prev) =>
        prev.map((pg) => (pg._id === updated._id ? updated : pg))
      );
    } catch (err) {
      console.error("Verify failed:", err.message);
    }
  };

  /* ---------- ACTIVATE / SUSPEND PG ---------- */
  const toggleActive = async (id) => {
    try {
      const updated = await apiFetch(`/admin/pgs/${id}/toggle`, {
        method: "PATCH",
      });

      setPGs((prev) =>
        prev.map((pg) => (pg._id === updated._id ? updated : pg))
      );
    } catch (err) {
      console.error("Toggle failed:", err.message);
    }
  };

  /* ---------- LOADING STATE ---------- */
  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading PGs...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
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
          {pgs.map((pg) => (
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
                    GENDER_STYLE[pg.gender] || ""
                  }`}
                >
                  {pg.gender}
                </span>
              </td>

              {/* RENT */}
              <td className="px-4 py-3 text-gray-900 dark:text-gray-200">
                ₹{pg.rent}
              </td>

              {/* STATUS */}
              <td className="px-4 py-3">
                <span
                  className={`text-xs font-medium ${
                    pg.active ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {pg.active ? "Active" : "Inactive"}
                </span>
              </td>

              {/* ACTIONS */}
              <td className="px-4 py-3 flex justify-end gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleVerified(pg._id);
                  }}
                  className="text-blue-600 hover:opacity-80"
                  title="Verify PG"
                >
                  {pg.verified ? (
                    <ShieldCheck className="h-4 w-4" />
                  ) : (
                    <ShieldOff className="h-4 w-4" />
                  )}
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleActive(pg._id);
                  }}
                  className="text-gray-600 hover:text-red-600"
                  title="Suspend PG"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* EMPTY STATE */}
      {pgs.length === 0 && (
        <div className="py-10 text-center text-gray-500">
          No PGs available
        </div>
      )}

      {/* DETAILS MODAL */}
      {selectedPG && (
        <AdminPGDetailsModal
          pg={selectedPG}
          onClose={() => setSelectedPG(null)}
        />
      )}
    </div>
  );
}
