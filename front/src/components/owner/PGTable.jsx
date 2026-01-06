import { useState } from "react";
import {
  Edit,
  Eye,
  EyeOff,
  Wifi,
  Utensils,
  WashingMachine,
  Car,
} from "lucide-react";
import PGFormModal from "./PGFormModal";

/* -------------------- MOCK DATA -------------------- */
const mockPGs = [
  {
    id: 1,
    name: "Green Nest PG",
    city: "Kolkata",
    area: "Salt Lake",
    rent: 6500,
    gender: "girls",
    roomType: ["Single"],
    amenities: ["wifi", "food", "laundry"],
    active: true,
  },
  {
    id: 2,
    name: "Urban Stay",
    city: "New Town",
    area: "Action Area I",
    rent: 7500,
    gender: "boys",
    roomType: ["Double", "Triple"],
    amenities: ["wifi", "parking"],
    active: false,
  },
];

/* -------------------- HELPERS -------------------- */
const AMENITY_ICONS = {
  wifi: Wifi,
  food: Utensils,
  laundry: WashingMachine,
  parking: Car,
};

const GENDER_STYLES = {
  boys: "bg-blue-100 text-blue-700 dark:bg-blue-900/40",
  girls: "bg-pink-100 text-pink-700 dark:bg-pink-900/40",
  coed: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200",
};

/* -------------------- COMPONENT -------------------- */
export default function PGTable() {
  const [editingPG, setEditingPG] = useState(null);

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <table className="w-full text-sm">
          {/* -------- TABLE HEAD -------- */}
          <thead className="bg-gray-100 dark:bg-zinc-800">
            <tr>
              <th className="px-4 py-3 text-left dark:text-gray-400">PG</th>
              <th className="px-4 py-3 text-left dark:text-gray-400">
                Gender
              </th>
              <th className="px-4 py-3 text-left dark:text-gray-400">
                Room Type
              </th>
              <th className="px-4 py-3 text-left dark:text-gray-400">
                Amenities
              </th>
              <th className="px-4 py-3 text-left dark:text-gray-400">
                Rent
              </th>
              <th className="px-4 py-3 text-right dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>

          {/* -------- TABLE BODY -------- */}
          <tbody>
            {mockPGs.map((pg) => (
              <tr
                key={pg.id}
                className="border-t border-gray-200 dark:border-zinc-800"
              >
                {/* PG NAME */}
                <td className="px-4 py-3">
                  <div className="font-medium dark:text-gray-200">
                    {pg.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {pg.area}, {pg.city}
                  </div>
                </td>

                {/* GENDER */}
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${GENDER_STYLES[pg.gender]}`}
                  >
                    {pg.gender}
                  </span>
                </td>

                {/* ROOM TYPE */}
                <td className="px-4 py-3">
                  <div className="flex gap-1 flex-wrap">
                    {pg.roomType.map((room) => (
                      <span
                        key={room}
                        className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-zinc-800 dark:text-gray-300"
                      >
                        {room}
                      </span>
                    ))}
                  </div>
                </td>

                {/* AMENITIES */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {pg.amenities.slice(0, 3).map((a) => {
                      const Icon = AMENITY_ICONS[a];
                      return Icon ? (
                        <Icon
                          key={a}
                          className="h-4 w-4 text-gray-600 dark:text-gray-400"
                        />
                      ) : null;
                    })}
                    {pg.amenities.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{pg.amenities.length - 3}
                      </span>
                    )}
                  </div>
                </td>

                {/* RENT */}
                <td className="px-4 py-3 font-medium dark:text-gray-200">
                  ₹{pg.rent}
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-3 flex justify-end gap-3">
                  <button
                    onClick={() => setEditingPG(pg)}
                    className="text-gray-500 hover:text-blue-600"
                  >
                    <Edit className="h-4 w-4" />
                  </button>

                  <button className="text-gray-500 hover:text-green-600">
                    {pg.active ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* EMPTY STATE */}
        {mockPGs.length === 0 && (
          <div className="py-10 text-center text-gray-500">
            No PGs yet 👀
          </div>
        )}
      </div>

      {/* -------- EDIT MODAL -------- */}
      {editingPG && (
        <PGFormModal
          pg={editingPG}
          onClose={() => setEditingPG(null)}
        />
      )}
    </>
  );
}
