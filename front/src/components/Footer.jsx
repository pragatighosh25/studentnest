import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Top section */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-semibold text-blue-600">
              StudentNest
            </h3>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              A student-first platform to discover PGs without brokers.
              Browse, visit, decide freely.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-200">
              Explore
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link to="/pgs" className="hover:text-blue-600 transition">
                  Browse PGs
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-600 transition">
                  How it works
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-600 transition">
                  List your PG
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust / Legal */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-200">
              Company
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link to="/" className="hover:text-blue-600 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-600 transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-600 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            © {new Date().getFullYear()} StudentNest. All rights reserved.
          </p>

          <p className="text-xs text-gray-500 dark:text-gray-500">
            Made for students, not brokers.
          </p>
        </div>
      </div>
    </footer>
  );
}
