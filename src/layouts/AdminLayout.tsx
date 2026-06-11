import { NavLink, Outlet, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { to: '/admin', label: 'Tổng quan', end: true },
  { to: '/admin/san-pham', label: 'Sản phẩm' },
  { to: '/admin/bang-gia', label: 'Bảng giá' },
  { to: '/admin/danh-gia', label: 'Đánh giá' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex">
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <Link to="/" className="text-xl font-bold text-primary">
            Như Mộng
          </Link>
          <p className="text-xs text-slate-500 mt-1">Quản trị hệ thống</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm font-medium truncate">{user?.name}</p>
          <p className="text-xs text-slate-500 truncate">{user?.email}</p>
          <button
            onClick={logout}
            className="mt-3 w-full text-sm text-red-500 hover:text-red-600 font-medium"
          >
            Đăng xuất
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
