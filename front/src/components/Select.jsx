import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Select({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="
          w-full flex items-center justify-between
          rounded-xl border border-gray-300 dark:border-zinc-700
          bg-white dark:bg-zinc-950
          px-4 py-2 text-sm
          text-gray-800 dark:text-gray-200
          hover:bg-gray-50 dark:hover:bg-zinc-900
        "
      >
        <span className={value ? "" : "text-gray-400"}>
          {value || label}
        </span>
        <ChevronDown
          className={`h-4 w-4 opacity-60 transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className="
            absolute z-50 mt-2 w-full overflow-hidden rounded-xl
            border border-gray-200 dark:border-zinc-800
            bg-white dark:bg-zinc-900
            shadow-lg
          "
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="
                w-full px-4 py-2 text-left text-sm
                text-gray-800 dark:text-gray-200
                hover:bg-gray-100 dark:hover:bg-zinc-800
              "
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

