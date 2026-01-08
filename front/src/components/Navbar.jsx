import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Link, useNavigate, useLocation } from "react-router-dom";


export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  /* ---------- LOAD USER FROM STORAGE ---------- */
  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  } else {
    setUser(null);
  }
}, [location.pathname]);

  /* ---------- LOGOUT ---------- */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); // ✅ reset React state
    setOpen(false);
    navigate("/owner/login"); // ✅ go back to auth page
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800">
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

          {/* Auth */}
          {!user ? (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-900"
              >
                Login
                <ChevronDown className="h-4 w-4" />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg overflow-hidden">
                  <Link
                    to="/owner/login"
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
                  >
                    Login / Register
                  </Link>
                </div>
              )}
            </div>
          ) : user.role === "student" ? (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1 text-gray-700 dark:text-zinc-300"
              >
                Welcome, {user.name}
                <ChevronDown className="h-4 w-4" />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-32 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg overflow-hidden">
                  <button
                    onClick={logout}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : user.role === "owner" || user.role === "admin" ? (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-white text-sm font-medium bg-blue-600 hover:bg-blue-700 transition"
              >
                {user.role === "admin" ? "Admin" : user.name}
                <ChevronDown className="h-4 w-4" />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-40 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg overflow-hidden">
                  <Link
                    to={
                      user.role === "admin"
                        ? "/admin/dashboard"
                        : "/owner/dashboard"
                    }
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={logout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-zinc-800"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : null}

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
