"use client";

import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // On mount: read saved or system theme
  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initial = saved ?? (systemDark ? "dark" : "light");
    document.documentElement.dataset.theme = initial;
    setTheme(initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    setTheme(next);
  };

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="
        relative w-14 h-8 rounded-full
        bg-[color:var(--bg-section)]
        border border-[color:var(--border-color)]
        transition-colors duration-300
        flex items-center px-1
      "
    >
      {/* Toggle knob */}
      <span
        className={`
          absolute w-6 h-6 rounded-full
          bg-[color:var(--bg-card)]
          shadow-[var(--shadow-card)]
          transition-transform duration-300
          ${isDark ? "translate-x-6" : "translate-x-0"}
        `}
      />

      {/* Icons */}
      <span className="relative z-10 flex justify-between w-full px-1">
        <Sun
          className={`w-4 h-4 ${
            isDark ? "text-[color:var(--text-muted)]" : "text-yellow-500"
          }`}
        />
        <Moon
          className={`w-4 h-4 ${
            isDark ? "text-indigo-400" : "text-[color:var(--text-muted)]"
          }`}
        />
      </span>
    </button>
  );
}
