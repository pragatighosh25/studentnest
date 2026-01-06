import { Link } from "react-router-dom";
import {motion} from "framer-motion";

export default function PGCard({ pg }) {
  return (
    <Link to={`/pg/${pg.id}`} className="group">
      <motion.div
      whileHover={{ y: -6 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
         className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden transition hover:shadow-lg">
        {/* Image */}
        <div className="relative h-44">
          <img
            src={pg.images[0]}
            alt={pg.name}
            className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
          />

          {pg.verified && (
            <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Verified
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {pg.name}
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {pg.area}
          </p>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-bold text-blue-600">
              ₹{pg.rent}
            </span>

            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300">
              {pg.gender}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

