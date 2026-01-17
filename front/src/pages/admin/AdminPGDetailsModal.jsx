import { X, ShieldCheck, ShieldOff } from "lucide-react";

const GENDER_STYLE = {
  Boys: "bg-blue-100 text-blue-700 dark:bg-blue-900/40",
  Girls: "bg-pink-100 text-pink-700 dark:bg-pink-900/40",
  "Co-ed": "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200",
};

export default function AdminPGDetailsModal({ pg, onClose }) {
  if (!pg) return null;

  const ownerName = pg.ownerId?.name || "—";
  const ownerEmail = pg.ownerId?.email || "—";

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ---------- HEADER ---------- */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            PG Details
          </h2>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* ---------- CONTENT ---------- */}
        <div className="space-y-6 text-sm">
          {/* OWNER INFO */}
          <div>
            <p className="text-gray-500">Owner</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {ownerName}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {ownerEmail}
            </p>
          </div>

          {/* PG INFO */}
          <div>
            <p className="text-gray-500">PG Name</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {pg.name}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {pg.area}, {pg.city}
            </p>
            {pg.address && (
              <p className="text-gray-600 dark:text-gray-400">
                {pg.address}
              </p>
            )}
          </div>

          {/* META */}
          <div className="flex flex-wrap gap-3">
            {pg.gender && (
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  GENDER_STYLE[pg.gender]
                }`}
              >
                {pg.gender}
              </span>
            )}

            {pg.roomType && (
              <span className="px-3 py-1 rounded-full text-xs bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400">
                {pg.roomType}
              </span>
            )}

            <span className="px-3 py-1 rounded-full text-xs bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400">
              Rent ₹{pg.rent}
            </span>

            {pg.deposit !== undefined && (
              <span className="px-3 py-1 rounded-full text-xs bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400">
                Deposit ₹{pg.deposit}
              </span>
            )}
          </div>

          {/* AMENITIES */}
          {Array.isArray(pg.amenities) && pg.amenities.length > 0 && (
            <div>
              <p className="text-gray-500 mb-2">Amenities</p>
              <div className="flex flex-wrap gap-2">
                {pg.amenities.map((a) => (
                  <span
                    key={a}
                    className="px-3 py-1 rounded-full text-xs bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* PHOTOS */}
          {Array.isArray(pg.images) && pg.images.length > 0 && (
            <div>
              <p className="text-gray-500 mb-2">Photos</p>
              <div className="grid grid-cols-3 gap-2">
                {pg.images.map((img, i) => (
                  <img
                    key={i}
                    src={typeof img === "string" ? img : img.url}
                    alt={`PG ${i + 1}`}
                    className="h-24 w-full object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          {/* STATUS */}
          <div className="flex items-center gap-4">
            <span
              className={`text-sm font-medium ${
                pg.active ? "text-green-600" : "text-gray-400"
              }`}
            >
              {pg.active ? "Active" : "Inactive"}
            </span>

            {pg.verified ? (
              <ShieldCheck
                className="h-5 w-5 text-blue-600"
                title="Verified"
              />
            ) : (
              <ShieldOff
                className="h-5 w-5 text-gray-400"
                title="Not verified"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
