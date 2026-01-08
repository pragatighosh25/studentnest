import { X, Upload, Trash2 } from "lucide-react";
import { useState } from "react";
import { apiFetch } from "../../utils/api";

const AMENITIES = [
  "WiFi",
  "Food",
  "AC",
  "Laundry",
  "Parking",
  "Power Backup",
];

/* ---------- INPUT FIELD (OUTSIDE COMPONENT) ---------- */
function InputField({ value, onChange, error, ...props }) {
  return (
    <div>
      <input
        {...props}
        value={value}
        onChange={onChange}
        className={`filter-input ${
          error ? "border-red-500 focus:ring-red-500/30" : ""
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

/* ---------- MAIN MODAL ---------- */
export default function PGFormModal({ pg, onClose, onSuccess }) {
  const isEdit = Boolean(pg);

  const [form, setForm] = useState({
    name: pg?.name || "",
    city: pg?.city || "",
    area: pg?.area || "",
    address: pg?.address || "",
    rent: pg?.rent || "",
    deposit: pg?.deposit || "",
    phone: pg?.phone || "",
    gender: pg?.gender || "",
    roomType: pg?.roomType || "",
    amenities: pg?.amenities || [],
    images: pg?.images || [],
    active: pg?.active ?? true,
  });

  const [errors, setErrors] = useState({});

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const toggleAmenity = (amenity) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleImages = (files) => {
  if (form.images.length + files.length > 6) {
    setErrors((prev) => ({
      ...prev,
      images: "You can upload maximum 6 images",
    }));
    return;
  }

  setForm((prev) => ({
    ...prev,
    images: [...prev.images, ...Array.from(files)],
  }));
};


  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const validate = () => {
    const newErrors = {};

    Object.entries(form).forEach(([key, value]) => {
      if (
        key !== "active" &&
        key !== "amenities" &&
        key !== "images" &&
        !value
      ) {
        newErrors[key] = "This field is mandatory";
      }
    });

    if (form.images.length === 0) {
      newErrors.images = "Please upload at least one photo";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    const data = new FormData();

    Object.entries(form).forEach(([key, value]) => {
  if (key === "amenities") {
    value.forEach((a) => data.append("amenities[]", a));
  } else if (key !== "images") {
    data.append(key, value);
  }
});

// 🔥 IMAGE HANDLING 
form.images.forEach((img) => {
  if (typeof img === "string" || img.url) {
    
    data.append("existingImages", img.url ?? img);
  } else {
    
    data.append("images", img);
  }
});

    if (isEdit) {
      await apiFetch(`/owner/pgs/${pg._id}`, {
        method: "PATCH",
        body: data,
        isFormData: true,
      });
    } else {
      await apiFetch("/owner/pgs", {
        method: "POST",
        body: data,
        isFormData: true,
      });
    }

    onSuccess();
    onClose();
  } catch (err) {
    console.error(err.message);
  }
};


  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur flex items-center justify-center px-4 overflow-y-auto" onClick={onClose}>
      <div className="w-full max-w-xl rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {isEdit ? "Edit PG" : "Add New PG"}
          </h2>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* FORM */}
        <div className="px-6 py-4 overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            placeholder="PG Name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            error={errors.name}
          />

          <InputField
            placeholder="Full Address"
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            error={errors.address}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              placeholder="City"
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              error={errors.city}
            />
            <InputField
              placeholder="Area"
              value={form.area}
              onChange={(e) => update("area", e.target.value)}
              error={errors.area}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              type="number"
              placeholder="Monthly Rent"
              value={form.rent}
              onChange={(e) => update("rent", e.target.value)}
              error={errors.rent}
            />
            <InputField
              type="number"
              placeholder="Deposit Amount"
              value={form.deposit}
              onChange={(e) => update("deposit", e.target.value)}
              error={errors.deposit}
            />
          </div>

          <InputField
            placeholder="Owner Phone Number"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            error={errors.phone}
          />

          {/* DROPDOWNS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: "gender", label: "Gender", options: ["Girls", "Boys", "Co-ed"] },
              { key: "roomType", label: "Room Type", options: ["Single", "Double", "Triple"] },
            ].map(({ key, label, options }) => (
              <div key={key}>
                <select
                  className={`filter-input ${
                    errors[key] ? "border-red-500" : ""
                  }`}
                  value={form[key]}
                  onChange={(e) => update(key, e.target.value)}
                >
                  <option value="">{label}</option>
                  {options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                {errors[key] && (
                  <p className="mt-1 text-xs text-red-500">{errors[key]}</p>
                )}
              </div>
            ))}
          </div>

          {/* AMENITIES */}
          <div>
            <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Amenities
            </p>
            <div className="flex flex-wrap gap-2">
              {AMENITIES.map((a) => (
                <button
                  type="button"
                  key={a}
                  onClick={() => toggleAmenity(a)}
                  className={`rounded-full px-3 py-1 text-sm border transition ${
                    form.amenities.includes(a)
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 dark:border-zinc-700 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Photos
            </p>

            <label className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 dark:border-zinc-700 p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 transition">
              <Upload className="h-6 w-6 text-gray-400" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {form.images.length > 0
                  ? "Add more photos"
                  : "Click to upload PG photos"}
              </p>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={(e) => handleImages(e.target.files)}
              />
            </label>

            {errors.images && (
              <p className="mt-1 text-xs text-red-500">{errors.images}</p>
            )}

            {form.images.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {form.images.map((img, i) => (
                  <div key={i} className="relative group">
                    <img src={typeof img === "string" ? img : img.url} alt="" className="h-24 w-full object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition"
                    >
                      <Trash2 className="h-5 w-5 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 transition"
          >
            {isEdit ? "Save Changes" : "Add PG"}
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}
