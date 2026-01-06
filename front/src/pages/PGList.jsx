import { useState } from "react";
import { pgList } from "../data/mockPGs";
import PGCard from "../components/PGCard";
import Filters from "../components/Filters";
import PageWrapper from "../components/PageWrapper";
import { useSearch } from "../context/SearchContext";

const normalize = (str = "") => str.toLowerCase().trim();

export default function PGList() {
  const { query } = useSearch();

  // unified filter state
  const [filters, setFilters] = useState({
    city: "",
    area: "",
    budget: "",
    gender: "",
    roomType: "",
  });

  // derive autocomplete suggestions
  const cities = [...new Set(pgList.map((pg) => pg.city))];
  const areas = [...new Set(pgList.map((pg) => pg.area))];


  // filtering logic
  const filteredPGs = pgList.filter((pg) => {
    const matchesSearch =
      normalize(pg.city).includes(normalize(query)) ||
      normalize(pg.area).includes(normalize(query));

    const matchesCity = filters.city
      ? normalize(pg.city).includes(normalize(filters.city))
      : true;

    const matchesArea = filters.area
      ? normalize(pg.area).includes(normalize(filters.area))
      : true;

    const matchesBudget = filters.budget
      ? pg.rent <= Number(filters.budget)
      : true;

    const matchesGender = filters.gender
      ? pg.gender === filters.gender
      : true;

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

  return (
    <PageWrapper>
      <section className="bg-gray-50 dark:bg-zinc-950 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-10">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              PGs in Kolkata
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {filteredPGs.length} options available
            </p>
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
          {filteredPGs.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPGs.map((pg) => (
                <PGCard key={pg.id} pg={pg} />
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
