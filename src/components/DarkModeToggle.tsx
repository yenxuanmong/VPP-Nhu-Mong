import { useDarkMode } from '../hooks/useDarkMode';

export default function DarkModeToggle() {
  const { isDark, toggle } = useDarkMode();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Bật chế độ sáng' : 'Bật chế độ tối'}
      className="fixed top-24 right-4 z-40 w-10 h-10 bg-white dark:bg-slate-800 rounded-full shadow-soft border border-slate-200 dark:border-slate-700 flex items-center justify-center text-lg hover:scale-110 transition-transform"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
