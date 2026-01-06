import { useParams } from "react-router-dom";
import { pgList } from "../data/mockPGs";
import PageWrapper from "../components/PageWrapper";
import { Verified } from "lucide-react";

export default function PGDetail() {
  const { id } = useParams();
  const pg = pgList.find((p) => p.id === id);

  if (!pg) {
    return (
      <div className="py-20 text-center text-gray-500">
        PG not found
      </div>
    );
  }

  return (
    <PageWrapper>
    <section className="bg-gray-50 dark:bg-zinc-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden">
          <img
            src={pg.images[0]}
            alt={pg.name}
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Header */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {pg.name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {pg.area}
            </p>
          </div>

          {pg.verified && (
            <span className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm px-3 py-1 rounded-full">
              <Verified className="h-4 w-4" /> Verified
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mt-6 p-5 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Monthly Rent
          </p>
          <p className="text-3xl font-bold text-blue-600 mt-1">
            ₹{pg.rent}
          </p>

          {pg.deposit && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Deposit: ₹{pg.deposit}
            </p>
          )}
        </div>

        {/* Amenities */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Amenities
          </h2>

          <div className="mt-4 flex flex-wrap gap-3">
            {pg.amenities.map((item) => (
              <span
                key={item}
                className="px-4 py-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-sm text-gray-700 dark:text-gray-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <a
            href={`tel:${pg.phone}`}
            className="w-full text-center py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-medium transition"
          >
            Call Owner
          </a>

          <a
            href={`https://wa.me/91${pg.phone}`}
            target="_blank"
            rel="noreferrer"
            className="w-full text-center py-3 rounded-xl border border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 font-medium transition"
          >
            WhatsApp Owner
          </a>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 p-4">
        <a
          href={`tel:${pg.phone}`}
          className="block w-full text-center py-3 rounded-xl bg-green-500 text-white font-medium"
        >
          Call Owner
        </a>
      </div>
    </section>
    </PageWrapper>
  );
}
