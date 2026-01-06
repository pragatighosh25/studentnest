import { SlidersHorizontal, X } from "lucide-react";
import Select from "./Select";
import AutocompleteInput from "./AutocompleteInput";

export default function Filters({
  filters,
  setFilters,
  cities = [],
  areas = [],
}) {
  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const hasFilters = Object.values(filters).some(Boolean);

  const clearOne = (key) => {
    setFilters((prev) => ({ ...prev, [key]: "" }));
  };

  const clearAll = () => {
    setFilters({
      city: "",
      area: "",
      budget: "",
      gender: "",
      roomType: "",
    });
  };

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 text-gray-700 dark:text-gray-300">
        <SlidersHorizontal className="h-4 w-4" />
        <span className="text-sm font-medium">Filters</span>
      </div>

      {/* Filter controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* City (AUTOCOMPLETE) */}
        <AutocompleteInput
          placeholder="City"
          value={filters.city}
          suggestions={cities}
          onChange={(val) => updateFilter("city", val)}
        />

        {/* Area (AUTOCOMPLETE) */}
        <AutocompleteInput
          placeholder="Area"
          value={filters.area}
          suggestions={areas}
          onChange={(val) => updateFilter("area", val)}
        />

        {/* Budget */}
        <Select
          label="Budget"
          value={filters.budget}
          onChange={(val) => updateFilter("budget", val)}
          options={[
            { label: "Up to ₹5,000", value: "5000" },
            { label: "Up to ₹8,000", value: "8000" },
            { label: "Up to ₹12,000", value: "12000" },
            { label: "Up to ₹15,000", value: "15000" },
          ]}
        />

        {/* Gender */}
        <Select
          label="Gender"
          value={filters.gender}
          onChange={(val) => updateFilter("gender", val)}
          options={[
            { label: "Girls", value: "Girls" },
            { label: "Boys", value: "Boys" },
            { label: "Co-ed", value: "Co-ed" },
          ]}
        />

        {/* Room Type */}
        <Select
          label="Room Type"
          value={filters.roomType}
          onChange={(val) => updateFilter("roomType", val)}
          options={[
            { label: "Single", value: "Single" },
            { label: "Double", value: "Double" },
            { label: "Triple", value: "Triple" },
          ]}
        />
      </div>

      {/* FILTER PILLS + CLEAR ALL */}
      {hasFilters && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {Object.entries(filters).map(
            ([key, value]) =>
              value && (
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
              )
          )}

          <div className="ml-auto">
            <button
              onClick={clearAll}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 transition"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
