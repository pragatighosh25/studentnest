import { MapPin } from "lucide-react";

export default function TextFilterInput({
  placeholder,
  value,
  onChange,
}) {
  return (
    <div
      className="
        flex items-center gap-2
        rounded-xl border border-gray-300 dark:border-zinc-700
        bg-white dark:bg-zinc-950
        px-4 py-2
        text-sm
        text-gray-800 dark:text-gray-200
        hover:bg-gray-50 dark:hover:bg-zinc-900
        focus-within:ring-2 focus-within:ring-blue-500/30
      "
    >
      <MapPin className="h-4 w-4 text-gray-400 shrink-0" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full bg-transparent outline-none
          placeholder:text-gray-400
        "
      />
    </div>
  );
}
