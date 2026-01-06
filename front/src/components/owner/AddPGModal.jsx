import { X } from "lucide-react";

export default function AddPGModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur flex items-center justify-center">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-zinc-900 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Add New PG
          </h2>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          <input className="filter-input" placeholder="PG Name" />
          <input className="filter-input" placeholder="City" />
          <input className="filter-input" placeholder="Rent" />
          <select className="filter-input">
            <option>Gender</option>
            <option>Girls</option>
            <option>Boys</option>
            <option>Co-ed</option>
          </select>
        </div>

        <button className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-white hover:bg-blue-700 transition">
          Save PG
        </button>
      </div>
    </div>
  );
}
