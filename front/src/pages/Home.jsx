import { Link } from "react-router-dom";
import {
  Search,
  ShieldCheck,
  PhoneCall,
  Home as HomeIcon,
  Users,
} from "lucide-react";
import PageWrapper from "../components/PageWrapper.jsx";
import Reveal from "../components/Reveal.jsx";
import { motion } from "framer-motion";
import SearchInput from "../components/SearchBar.jsx";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div className="relative overflow-hidden bg-gray-50 dark:bg-zinc-950">
        {/* 🔵 BACKGROUND GLOW */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute top-60 right-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        </div>

        {/* HERO */}
        <section className="relative max-w-6xl mx-auto px-4 pt-32 pb-24 text-center">
          <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 dark:text-white leading-tight">
            Find PGs that actually <br />
            <span className="text-blue-600">feel right.</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            StudentNest helps students discover trusted PGs, talk directly to
            owners, and visit before deciding — without brokers or pressure.
          </p>

          {/* SEARCH BAR */}
          <SearchInput
            className="mt-10 max-w-xl mx-auto"
            placeholder="Search by city, area, or budget"
            autoNavigate
          />
          {/* HERO CTA BUTTONS */}
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/pgs"
              className="rounded-xl bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition"
            >
              Browse PGs
            </Link>

            <button
              onClick={() => navigate("/owner/login")}
              className="rounded-xl border border-gray-300 dark:border-zinc-700 px-6 py-3 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
            >
              Owner Login
            </button>
          </div>

          {/* TRUST STRIP */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              Verified PGs
            </span>
            <span className="flex items-center gap-2">
              <PhoneCall className="h-4 w-4 text-blue-500" />
              Direct owner contact
            </span>
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4 text-indigo-500" />
              Student-first platform
            </span>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="relative max-w-6xl mx-auto px-4 py-24">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-900 dark:text-white">
              How StudentNest works
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: HomeIcon,
                title: "Browse PGs",
                desc: "Explore PGs by city, area, budget, and preferences.",
              },
              {
                icon: PhoneCall,
                title: "Talk & Visit",
                desc: "Call owners directly and visit PGs before deciding.",
              },
              {
                icon: ShieldCheck,
                title: "Move with confidence",
                desc: "No brokers, no hidden charges, no pressure.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-8 shadow-sm hover:shadow-xl transition"
              >
                <item.icon className="h-8 w-8 text-blue-600 mb-4 group-hover:scale-110 transition" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="bg-white dark:bg-zinc-900">
          <div className="max-w-6xl mx-auto px-4 py-24">
            <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-900 dark:text-white">
              Why students love StudentNest
            </h2>

            <div className="mt-16 flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-4xl">
                {[
                  "Verified and trusted PG listings",
                  "No brokers or forced bookings",
                  "Clean, simple and fast experience",
                  "Built specifically for students",
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FOR WHO */}
        <section className="max-w-6xl mx-auto px-4 py-24 grid gap-8 md:grid-cols-2">
          {/* Student Card */}
          <div className="rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 p-10 border border-gray-200 dark:border-zinc-800 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                For Students
              </h3>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Discover PGs transparently, avoid agents, and decide at your own
                pace.
              </p>
            </div>

            <button
              onClick={() => {
                localStorage.setItem("role", "student");
                window.location.reload();
              }}
              className="mt-8 w-fit rounded-xl bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition"
            >
              Continue as Student
            </button>
          </div>

          {/* Owner Card */}
          <div className="rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20 p-10 border border-gray-200 dark:border-zinc-800 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                For PG Owners
              </h3>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                List your PG for free and connect with genuine student
                enquiries.
              </p>
            </div>

            <button
              onClick={() => navigate("/owner/login")}
              className="mt-8 w-fit rounded-xl bg-green-600 px-6 py-3 text-white font-medium hover:bg-green-700 transition"
            >
              Owner Login
            </button>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 bg-gray-50 dark:bg-zinc-950">
          <div className="max-w-6xl mx-auto px-4">
            <div
              className="
        relative overflow-hidden rounded-3xl
        border border-gray-200 dark:border-zinc-800
        bg-white dark:bg-zinc-900
        p-12 md:p-16
      "
            >
              {/* subtle accent glow */}
              <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />

              <div className="relative text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white">
                  Find a PG you’ll actually like living in.
                </h2>

                <p className="mt-5 text-lg text-gray-600 dark:text-gray-400">
                  Explore verified PGs, talk directly to owners, and make your
                  decision after visiting — no pressure, no brokers.
                </p>

                <div className="mt-10 flex justify-center gap-4">
                  <Link
                    to="/pgs"
                    className="
              inline-flex items-center justify-center
              rounded-xl bg-blue-600 px-8 py-3
              font-medium text-white
              hover:bg-blue-700
              transition
            "
                  >
                    Browse PGs
                  </Link>

                  <Link
                    to="/"
                    className="
              inline-flex items-center justify-center
              rounded-xl px-8 py-3
              font-medium
              text-gray-700 dark:text-gray-300
              border border-gray-300 dark:border-zinc-700
              hover:bg-gray-100 dark:hover:bg-zinc-800
              transition
            "
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
