import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";

export default function SearchInput({ autoNavigate = false }) {
  const { query, setQuery } = useSearch();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (autoNavigate) navigate("/pgs");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="mt-10 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur border border-gray-200 dark:border-zinc-800 p-2 shadow-lg">
        <Search className="text-gray-400 ml-3" />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search by city or area"
          className="flex-1 bg-transparent px-2 py-3 outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
        />

        <button
          onClick={handleSearch}
          className="rounded-xl bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>
    </div>
  );
}
