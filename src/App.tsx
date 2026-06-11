import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import RequireAuth from './components/RequireAuth';
import Home from './pages/Home';
import Services from './pages/Services';
import Products from './pages/Products';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminPricing from './pages/admin/AdminPricing';
import AdminReviews from './pages/admin/AdminReviews';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="dich-vu" element={<RequireAuth><Services /></RequireAuth>} />
        <Route path="san-pham" element={<RequireAuth><Products /></RequireAuth>} />
        <Route path="bang-gia" element={<RequireAuth><Pricing /></RequireAuth>} />
        <Route path="lien-he" element={<RequireAuth><Contact /></RequireAuth>} />
      </Route>

      <Route path="dang-nhap" element={<Login />} />
      <Route path="dang-ky" element={<Register />} />

      <Route
        path="admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="san-pham" element={<AdminProducts />} />
        <Route path="bang-gia" element={<AdminPricing />} />
        <Route path="danh-gia" element={<AdminReviews />} />
      </Route>
    </Routes>
  );
}
