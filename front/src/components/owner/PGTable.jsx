import { Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { apiFetch } from "../../utils/api";

export default function PGTable({ pgs, onEdit, onRefresh }) {
  const toggleActive = async (pg) => {
    try {
      await apiFetch(`/owner/pgs/${pg._id}`, {
        method: "PATCH",
        body: JSON.stringify({ active: !pg.active }),
      });
      onRefresh();
    } catch (err) {
      console.error(err.message);
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
            <th className="px-4 py-3 text-left">PG</th>
            <th className="px-4 py-3 text-left">City</th>
            <th className="px-4 py-3 text-left">Rent</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {pgs.map((pg) => (
            <tr
              key={pg._id}
              className="border-t border-gray-200 dark:border-zinc-800"
            >
              <td className="px-4 py-3">{pg.name}</td>
              <td className="px-4 py-3">{pg.city}</td>
              <td className="px-4 py-3">₹{pg.rent}</td>
              <td className="px-4 py-3 flex justify-end gap-3">
                <button onClick={() => onEdit(pg)}>
                  <Edit className="h-4 w-4 text-blue-600" />
                </button>

                <button onClick={() => toggleActive(pg)}>
                  {pg.active ? (
                    <Eye className="h-4 w-4 text-green-600" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  )}
                </button>

                <button onClick={() => deletePG(pg._id)}>
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
