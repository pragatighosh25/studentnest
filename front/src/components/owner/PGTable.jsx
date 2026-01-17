import { Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { apiFetch } from "../../utils/api";

export default function PGTable({ pgs, onEdit, onRefresh, setPGs }) {
  const toggleActive = async (pg) => {
  const newActive = !pg.active;

  // ✅ Optimistic UI update
  setPGs((prev) =>
    prev.map((p) => (p._id === pg._id ? { ...p, active: newActive } : p))
  );

  try {
    await apiFetch(`/owner/pgs/${pg._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: newActive }),
    });
  } catch (err) {
    console.error(err.message);

    // ❌ rollback if failed
    setPGs((prev) =>
      prev.map((p) => (p._id === pg._id ? { ...p, active: pg.active } : p))
    );
  }
};


  const deletePG = async (id) => {
    if (!confirm("Delete this PG?")) return;

    try {
      await apiFetch(`/owner/pgs/${id}`, { method: "DELETE" });
      onRefresh();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 dark:bg-zinc-800">
          <tr>
            <th className="dark:text-gray-500 px-4 py-3 text-left">PG</th>
            <th className="dark:text-gray-500 px-4 py-3 text-left">City</th>
            <th className="dark:text-gray-500 px-4 py-3 text-left">Rent</th>
            <th className="dark:text-gray-500 px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {pgs.map((pg) => (
            <tr
              key={pg._id}
              className="border-t border-gray-200 dark:border-zinc-800"
            >
              <td className="dark:text-gray-300 px-4 py-3">{pg.name}</td>
              <td className="dark: text-gray-300 px-4 py-3">{pg.city}</td>
              <td className="dark: text-gray-300 px-4 py-3">₹{pg.rent}</td>
              <td className="dark:text-gray-300 px-4 py-3 flex justify-end gap-3">
  <button
    onClick={() => onEdit(pg)}
    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition cursor-pointer"
    title="Edit PG"
  >
    <Edit className="h-4 w-4 text-blue-600" />
  </button>

  <button
    onClick={() => toggleActive(pg)}
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
    onClick={() => deletePG(pg._id)}
    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition cursor-pointer"
    title="Delete PG"
  >
    <Trash2 className="h-4 w-4 text-red-600" />
  </button>
</td>

            </tr>
          ))}

          {pgs.length === 0 && (
            <tr>
              <td colSpan="4" className="py-8 text-center text-gray-500">
                No PGs added yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
