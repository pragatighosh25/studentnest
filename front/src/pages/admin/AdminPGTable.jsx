import { Eye, EyeOff, ShieldCheck, ShieldOff, Trash2 } from "lucide-react";
import AdminPGDetailsModal from "./AdminPGDetailsModal";
import { apiFetch } from "../../utils/api";

const GENDER_STYLE = {
  Boys: "bg-blue-100 text-blue-700 dark:bg-blue-900/40",
  Girls: "bg-pink-100 text-pink-700 dark:bg-pink-900/40",
  "Co-ed": "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200",
};

export default function AdminPGTable({ pgs, setPGs, loading }) {

  const [pgs, setPGs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPG, setSelectedPG] = useState(null);



  /* ---------- VERIFY / UNVERIFY PG ---------- */
  const toggleVerified = async (pg) => {
    try {
      const updated = await apiFetch(`/admin/pgs/${pg._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verified: !pg.verified }),
      });

      setPGs((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
    } catch (err) {
      console.error("Verify failed:", err.message);
    }
  };

  /* ---------- ACTIVATE / SUSPEND PG ---------- */
  const toggleActive = async (pg) => {
    try {
      const updated = await apiFetch(`/admin/pgs/${pg._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !pg.active }),
      });

      setPGs((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
    } catch (err) {
      console.error("Toggle failed:", err.message);
    }
  };
  /* ---------- DELETE PG ---------- */
  const deletePG = async (id) => {
    if (!confirm("Delete this PG permanently?")) return;

    try {
      await apiFetch(`/admin/pgs/${id}`, { method: "DELETE" });
      setPGs((prev) => prev.filter((p) => p._id !== id));
      setSelectedPG(null);
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  /* ---------- LOADING STATE ---------- */
  if (loading) {
    return <div className="p-10 text-center text-gray-500">Loading PGs...</div>;
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
            <th className="px-4 py-3 text-right dark:text-gray-400">Actions</th>
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
                  title={pg.active ? "Hide from students" : "Show to students"}
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
                    deletePG(pg._id);
                  }}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                  title="Delete PG"
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* EMPTY STATE */}
      {pgs.length === 0 && (
        <div className="py-10 text-center text-gray-500">No PGs available</div>
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
