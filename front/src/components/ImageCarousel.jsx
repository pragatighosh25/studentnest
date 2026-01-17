import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageCarousel({ images = [], alt = "PG photo" }) {
  const urls = useMemo(() => {
    return (images || [])
      .map((img) => (typeof img === "string" ? img : img?.url))
      .filter(Boolean);
  }, [images]);

  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? urls.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === urls.length - 1 ? 0 : i + 1));

  if (urls.length === 0) {
    return (
      <div className="h-64 rounded-2xl bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-gray-500">
        No images available
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Main image */}
      <div className="relative rounded-2xl overflow-hidden">
        <img
          src={urls[index]}
          alt={alt}
          className="w-full h-64 md:h-80 object-cover"
        />

        {urls.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 hover:bg-black/60 transition"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>

            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 hover:bg-black/60 transition"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
              {index + 1}/{urls.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {urls.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {urls.map((url, i) => (
            <button
              key={url + i}
              onClick={() => setIndex(i)}
              className={`shrink-0 rounded-xl overflow-hidden border transition ${
                i === index
                  ? "border-blue-600"
                  : "border-gray-200 dark:border-zinc-800"
              }`}
            >
              <img src={url} alt="" className="h-16 w-24 object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
