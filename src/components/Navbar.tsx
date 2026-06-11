import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS, STORE } from '../utils/constants';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-soft py-3' : 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-6 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 shrink-0">
  <img
    src="/images/TrangChu.png"
    alt="Văn Phòng Phẩm Như Mộng"
    className="w-12 h-12 rounded-full object-cover shadow-soft"
  />

  <span className="font-bold text-primary text-lg hidden sm:block">
    {STORE.shortName}
  </span>
</Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Menu chính">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/5'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="hidden md:flex items-center gap-2">
              {isAdmin && (
                <Link to="/admin" className="text-sm font-medium text-primary hover:underline">
                  Quản trị
                </Link>
              )}
              <span className="text-sm text-slate-600 dark:text-slate-300">{user.name}</span>
              <button onClick={logout} className="text-sm text-slate-500 hover:text-red-500">
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link to="/dang-nhap" className="hidden md:inline-flex text-sm font-medium text-primary hover:underline">
              Đăng nhập
            </Link>
          )}
          <a
            href={`tel:${STORE.phone}`}
            className="btn-primary text-sm py-2.5 px-5 hidden md:inline-flex"
            aria-label={`Gọi ngay ${STORE.phoneDisplay}`}
          >
            📞 Gọi ngay
          </a>
          <button
            type="button"
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Mở menu"
            aria-expanded={menuOpen}
          >
            <span className={`w-6 h-0.5 bg-slate-700 dark:bg-slate-200 transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-slate-700 dark:bg-slate-200 transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-slate-700 dark:bg-slate-200 transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-white/20 overflow-hidden"
            aria-label="Menu di động"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-medium ${
                      isActive ? 'text-primary bg-primary/10' : 'text-slate-600 dark:text-slate-300'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <a href={`tel:${STORE.phone}`} className="btn-primary mt-2 justify-center">
                📞 Gọi ngay
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
