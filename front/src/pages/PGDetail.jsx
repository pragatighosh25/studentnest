import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { Verified } from "lucide-react";
import { apiFetch } from "../utils/api";
import ImageCarousel from "../components/ImageCarousel";
import InquiryDetailsModal from "../components/InquiryDetailsModal";

export default function PGDetail() {
  const { id } = useParams();

  const [pg, setPg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("call");

  const logInquiry = async (type, details) => {
    try {
      await apiFetch(`/pgs/${id}/inquiry`, {
        method: "POST",
        body: JSON.stringify({ type, ...details }),
      });
    } catch (err) {
      console.error("Inquiry log failed:", err.message);
    }
  };

  const handleContactClick = (type, e) => {
    const savedDetails = localStorage.getItem("student_inquiry_details");
    if (savedDetails) {
      try {
        const details = JSON.parse(savedDetails);
        logInquiry(type, details);
        return; // Proceed with default link behavior
      } catch (err) {
        console.error("Error parsing saved details:", err);
      }
    }

    // Prefill details from user context if logged in, but still require submission/verification
    e.preventDefault();
    setModalType(type);
    setShowModal(true);
  };

  const handleModalSubmit = async (details) => {
    setShowModal(false);
    localStorage.setItem("student_inquiry_details", JSON.stringify(details));
    await logInquiry(modalType, details);

    // Manually trigger the action
    if (modalType === "call") {
      window.location.href = `tel:${pg.phone}`;
    } else {
      window.open(`https://wa.me/91${pg.phone}`, "_blank", "noreferrer");
    }
  };

  useEffect(() => {
    const fetchPG = async () => {
      try {
        const data = await apiFetch(`/pgs/${id}`); // ✅ GET /api/pgs/:id
        setPg(data);
      } catch (err) {
        console.error(err.message);
        setPg(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPG();
  }, [id]);

  const getImageUrl = (img) => {
    if (!img) return "";
    if (typeof img === "string") return img;
    return img.url;
  };

  if (loading) {
    return (
      <PageWrapper>
        <section className="bg-gray-50 dark:bg-zinc-950 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 py-10 text-gray-500">
            Loading PG details...
          </div>
        </section>
      </PageWrapper>
    );
  }

  if (!pg) {
    return (
      <PageWrapper>
        <div className="py-20 text-center text-gray-500">PG not found</div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <section className="bg-gray-50 dark:bg-zinc-950 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-10">
          {/* Image */}
          <ImageCarousel images={pg.images} alt={pg.name} />


          {/* Header */}
          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {pg.name}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {pg.area}, {pg.city}
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
            <p className="text-3xl font-bold text-blue-600 mt-1">₹{pg.rent}</p>

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
              {(pg.amenities || []).length > 0 ? (
                pg.amenities.map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-sm text-gray-700 dark:text-gray-300"
                  >
                    {item}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-500">No amenities listed</p>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <a
              href={`tel:${pg.phone}`}
              onClick={(e) => handleContactClick("call", e)}
              className="w-full text-center py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-medium transition"
            >
              Call Owner
            </a>


            <a
              href={`https://wa.me/91${pg.phone}`}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => handleContactClick("whatsapp", e)}
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
            onClick={(e) => handleContactClick("call", e)}
            className="block w-full text-center py-3 rounded-xl bg-green-500 text-white font-medium"
          >
            Call Owner
          </a>
        </div>
      </section>

      <InquiryDetailsModal
        open={showModal}
        type={modalType}
        onClose={() => setShowModal(false)}
        onSubmit={handleModalSubmit}
      />
    </PageWrapper>
  );
}
