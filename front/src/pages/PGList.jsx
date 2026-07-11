import { useEffect, useMemo, useState } from "react";
import PGCard from "../components/PGCard";
import Filters from "../components/Filters";
import PageWrapper from "../components/PageWrapper";
import { useSearch } from "../context/SearchContext";
import { apiFetch } from "../utils/api";

const normalize = (str = "") => String(str).toLowerCase().trim();

const toTitleCase = (str = "") => {
  if (!str) return "";
  return String(str)
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function PGList() {
  const { query } = useSearch();

  const [filters, setFilters] = useState({
    city: "",
    area: "",
    budget: "",
    gender: "",
    roomType: "",
  });

  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ fetch public PGs
  useEffect(() => {
    const fetchPGs = async () => {
      try {
        const data = await apiFetch("/pgs"); // ✅ GET /api/pgs
        setPgs(data);
      } catch (err) {
        console.error("Failed to fetch PGs:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPGs();
  }, []);

  // ✅ suggestions from backend data
  const cities = useMemo(() => {
    const raw = pgs.map((pg) => toTitleCase(pg.city)).filter(Boolean);
    return [...new Set(raw)];
  }, [pgs]);

  const areas = useMemo(() => {
    const raw = pgs.map((pg) => toTitleCase(pg.area)).filter(Boolean);
    return [...new Set(raw)];
  }, [pgs]);

  // ✅ filter backend PGs
  const filteredPGs = useMemo(() => {
    return pgs.filter((pg) => {
      const matchesSearch =
        normalize(pg.city).includes(normalize(query)) ||
        normalize(pg.area).includes(normalize(query)) ||
        normalize(pg.name).includes(normalize(query));

      const matchesCity = filters.city
        ? normalize(pg.city).includes(normalize(filters.city))
        : true;

      const matchesArea = filters.area
        ? normalize(pg.area).includes(normalize(filters.area))
        : true;

      const matchesBudget = filters.budget
        ? Number(pg.rent) <= Number(filters.budget)
        : true;

      const matchesGender = filters.gender ? pg.gender === filters.gender : true;

      const matchesRoomType = filters.roomType
        ? pg.roomType === filters.roomType
        : true;

      return (
        matchesSearch &&
        matchesCity &&
        matchesArea &&
        matchesBudget &&
        matchesGender &&
        matchesRoomType
      );
    });
  }, [pgs, query, filters]);

  return (
    <PageWrapper>
      <section className="bg-gray-50 dark:bg-zinc-950 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-10">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              PGs
            </h1>

            {loading ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Loading options...
              </p>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {filteredPGs.length} options available
              </p>
            )}
          </div>

          {/* Filters */}
          <div className="mb-8">
            <Filters
              filters={filters}
              setFilters={setFilters}
              cities={cities}
              areas={areas}
            />
          </div>

          {/* Cards */}
          {loading ? (
            <p className="text-gray-500">Loading PGs...</p>
          ) : filteredPGs.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPGs.map((pg) => (
                <PGCard key={pg._id} pg={pg} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                No PGs found
                {query && (
                  <>
                    {" "}
                    for <span className="font-medium">"{query}"</span>
                  </>
                )}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Try another area, city, or clear filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
}
