import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);

    if (saved === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);

    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative flex h-10 w-10 items-center justify-center rounded-xl
                 bg-gray-100 dark:bg-zinc-800
                 hover:bg-gray-200 dark:hover:bg-zinc-700
                 transition-colors"
    >
      {/* Sun */}
      <Sun
        className={`absolute h-5 w-5 text-yellow-500 transition-all duration-300
          ${theme === "light"
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 -rotate-90 opacity-0"}`}
      />

      {/* Moon */}
      <Moon
        className={`absolute h-5 w-5 text-blue-400 transition-all duration-300
          ${theme === "dark"
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 rotate-90 opacity-0"}`}
      />
    </button>
  );
}
