import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

export default function InquiryDetailsModal({ open, onClose, onSubmit, type = "call" }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  // Prefill details if user is logged in
  useEffect(() => {
    if (open) {
      setError("");
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          if (user.name) setName(user.name);
          if (user.email) setEmail(user.email);
        } catch (e) {
          console.error("Failed to parse user details:", e);
        }
      } else {
        // If not logged in, reset inputs
        setName("");
        setEmail("");
      }
      setPhone("");
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("All fields are mandatory");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Phone number validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.trim())) {
      setError("Phone number must be a valid 10-digit number");
      return;
    }

    onSubmit({ name: name.trim(), email: email.trim(), phone: phone.trim() });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur flex items-center justify-center px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-xl p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Enter Your Details
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Please provide your details so we can connect you with the owner.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="filter-input"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="filter-input"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              Phone Number (10 digits)
            </label>
            <input
              type="tel"
              placeholder="9876543210"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              className="filter-input"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center font-medium mt-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 transition"
          >
            {type === "call" ? "Call Owner Now" : "WhatsApp Owner Now"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
