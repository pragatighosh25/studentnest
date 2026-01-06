import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const loginAsStudent = () => {
    localStorage.setItem("role", "student");
    localStorage.setItem("name", "Student");
    window.location.reload();
  };

  const loginAsOwner = () => {
    navigate("/owner/login");
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <nav
      className="
        sticky top-0 z-50
        bg-white/80 backdrop-blur
        dark:bg-zinc-950
        border-b border-gray-200 dark:border-zinc-800
      "
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-semibold text-blue-600">
          StudentNest
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-4 relative">
          <Link
            to="/pgs"
            className="text-gray-700 dark:text-zinc-300 hover:text-blue-600 transition"
          >
            Browse PGs
          </Link>

          {/* AUTH SECTION */}
          {!role ? (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="
                  flex items-center gap-1
                  rounded-lg px-3 py-2
                  text-gray-700 dark:text-zinc-300
                  hover:bg-gray-100 dark:hover:bg-zinc-900
                "
              >
                Login
                <ChevronDown className="h-4 w-4" />
              </button>

              {open && (
                <div
                  className="
                    absolute right-0 mt-2 w-44 rounded-xl
                    border border-gray-200 dark:border-zinc-800
                    bg-white dark:bg-zinc-900
                    shadow-lg overflow-hidden
                  "
                >
                  <button
                    onClick={loginAsStudent}
                    className="w-full dark:text-gray-400 px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-zinc-800"
                  >
                    Continue as Student
                  </button>

                  <button
                    onClick={loginAsOwner}
                    className="w-full dark:text-gray-400 px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-zinc-800"
                  >
                    Login as Owner
                  </button>
                </div>
              )}
            </div>
          ) : role === "student" ? (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1 text-gray-700 dark:text-zinc-300"
              >
                Welcome, {name}
                <ChevronDown className="h-4 w-4" />
              </button>

              {open && (
                <div
                  className="
                    absolute right-0 mt-2 w-32 rounded-xl
                    border border-gray-200 dark:border-zinc-800
                    bg-white dark:bg-zinc-900
                    shadow-lg overflow-hidden
                  "
                >
                  <button
                    onClick={logout}
                    className="w-full dark:text-gray-400 px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-zinc-800"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/owner/dashboard"
              className="
                rounded-lg bg-blue-600 px-4 py-2
                text-white text-sm font-medium
                hover:bg-blue-700 transition
              "
            >
              {name || "Owner"}’s Dashboard
            </Link>
          )}

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
