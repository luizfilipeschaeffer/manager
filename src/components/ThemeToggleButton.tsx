"use client";
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggleButton() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      aria-label="Alternar tema"
      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      title={isDark ? 'Tema claro' : 'Tema escuro'}
      type="button"
    >
      {isDark ? (
        // Ícone Sol
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-yellow-400">
          <circle cx="12" cy="12" r="5" strokeWidth="1.5" />
          <path strokeLinecap="round" strokeWidth="1.5" d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41" />
        </svg>
      ) : (
        // Ícone Lua
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-700 dark:text-gray-200">
          <path strokeLinecap="round" strokeWidth="1.5" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
        </svg>
      )}
    </button>
  );
} 