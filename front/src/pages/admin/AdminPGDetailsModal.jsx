import { X, ShieldCheck, ShieldOff } from "lucide-react";

const GENDER_STYLE = {
  Boys: "bg-blue-100 text-blue-700",
  Girls: "bg-pink-100 text-pink-700",
  "Co-ed": "bg-gray-200 text-gray-700",
};

export default function AdminPGDetailsModal({ pg, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            PG Details
          </h2>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm">
          {/* Owner */}
          <div>
            <p className="text-gray-500">Owner</p>
            <p className="font-medium dark:text-gray-100">{pg.ownerName}</p>
            <p className="text-gray-600">{pg.ownerPhone}</p>
          </div>

          {/* PG Info */}
          <div>
            <p className="text-gray-500">PG Name</p>
            <p className="font-medium dark:text-gray-100">{pg.name}</p>
            <p className="text-gray-600">
              {pg.area}, {pg.city}
            </p>
            <p className="text-gray-600">{pg.address}</p>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                GENDER_STYLE[pg.gender]
              }`}
            >
              {pg.gender}
            </span>

            <span className="px-3 py-1 dark:text-gray-500 rounded-full text-xs bg-gray-100 dark:bg-zinc-800">
              {pg.roomType}
            </span>

            <span className="px-3 py-1 rounded-full dark:text-gray-500 text-xs bg-gray-100 dark:bg-zinc-800">
              Rent ₹{pg.rent}
            </span>

            <span className="px-3 py-1 rounded-full dark:text-gray-500 text-xs bg-gray-100 dark:bg-zinc-800">
              Deposit ₹{pg.deposit}
            </span>
          </div>
          {/* Amenities */}
          {pg.amenities?.length > 0 && (
            <div>
              <p className="text-gray-500 mb-2">Amenities</p>
              <div className="flex flex-wrap gap-2">
                {pg.amenities.map((a) => (
                  <span
                    key={a}
                    className="px-3 py-1 rounded-full dark:text-gray-500 text-xs bg-gray-100 dark:bg-zinc-800"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Photos */}
          {pg.images?.length > 0 && (
            <div>
              <p className="text-gray-500 mb-2">Photos</p>
              <div className="grid grid-cols-3 gap-2">
                {pg.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="h-24 w-full object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Status */}
          <div className="flex items-center gap-4">
            <span
              className={`text-sm font-medium ${
                pg.active ? "text-green-600" : "text-gray-400"
              }`}
            >
              {pg.active ? "Active" : "Inactive"}
            </span>

            {pg.verified ? (
              <ShieldCheck className="h-5 w-5 text-blue-600" />
            ) : (
              <ShieldOff className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
