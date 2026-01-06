import { useState } from "react";
import { MapPin } from "lucide-react";

export default function AutocompleteInput({
  placeholder,
  value,
  onChange,
  suggestions,
}) {
  const [open, setOpen] = useState(false);

  const filtered = suggestions.filter((item) =>
    item.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div className="relative">
      <div
        className="
          flex items-center gap-2
          rounded-xl border border-gray-300 dark:border-zinc-700
          bg-white dark:bg-zinc-950
          px-4 py-2 text-sm
          focus-within:ring-2 focus-within:ring-blue-500/30
        "
      >
        <MapPin className="h-4 w-4 text-gray-400" />
        <input
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-gray-400"
        />
      </div>

      {open && value && filtered.length > 0 && (
        <div
          className="
            absolute z-50 mt-2 w-full
            rounded-xl border border-gray-200 dark:border-zinc-800
            bg-white dark:bg-zinc-900
            shadow-lg overflow-hidden
          "
        >
          {filtered.slice(0, 5).map((item) => (
            <button
              key={item}
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
              className="
                w-full px-4 py-2 text-left text-sm
                hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-gray-900 dark:hover:text-white
              "
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
