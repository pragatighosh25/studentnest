import { X } from "lucide-react";

export default function FilterChips({ filters, setFilters }) {
  const entries = Object.entries(filters).filter(
    ([_, value]) => value
  );

  if (entries.length === 0) return null;

  const clearOne = (key) => {
    setFilters((prev) => ({ ...prev, [key]: "" }));
  };

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {entries.map(([key, value]) => (
        <span
          key={key}
          className="
            flex items-center gap-1
            rounded-full bg-blue-50 dark:bg-blue-900/30
            px-3 py-1 text-sm
            text-blue-700 dark:text-blue-300
          "
        >
          {value}
          <button
            onClick={() => clearOne(key)}
            className="hover:text-blue-900 dark:hover:text-white"
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
    </div>
  );
}
