import { useEffect, useState } from 'react';
import { api, type DbProduct } from '../../lib/api';
import { formatPrice } from '../../utils/format';
import { categories } from '../../data/products';

const emptyProduct: {
  name: string;
  category: string;
  brand: string;
  price: number;
  image: string;
  badge: string;
  salePercent: string;
} = {
  name: '',
  category: categories[0],
  brand: '',
  price: 0,
  image: '',
  badge: '',
  salePercent: '',
};

export default function AdminProducts() {
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<DbProduct | null>(null);
  const [form, setForm] = useState(emptyProduct);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.products
      .list()
      .then(setProducts)
      .catch(() => setError('Không thể tải sản phẩm'))
      .finally(() => setLoading(false));
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(emptyProduct);
    setError('');
    setModalOpen(true);
  }

  function openEdit(product: DbProduct) {
    setEditing(product);
    setForm({
      name: product.name,
      category: product.category,
      brand: product.brand,
      price: product.price,
      image: product.image,
      badge: product.badge || '',
      salePercent: product.salePercent ? String(product.salePercent) : '',
    });
    setError('');
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        badge: form.badge || undefined,
        salePercent: form.salePercent ? Number(form.salePercent) : undefined,
      };

      if (editing) {
        const updated = await api.products.update(editing.id, payload);
        // Optimistic update: replace in list immediately
        setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      } else {
        const created = await api.products.create(payload);
        // Optimistic update: prepend new product
        setProducts((prev) => [created, ...prev]);
      }

      setModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi lưu sản phẩm');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;
    // Optimistic remove immediately
    setProducts((prev) => prev.filter((p) => p.id !== id));
    try {
      await api.products.delete(id);
    } catch {
      alert('Không thể xóa sản phẩm');
      // Revert on failure
      api.products.list().then(setProducts);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
        <button onClick={openCreate} className="btn-primary text-sm px-4 py-2">
          + Thêm sản phẩm
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-700/50">
              <tr>
                <th className="text-left p-4">Sản phẩm</th>
                <th className="text-left p-4">Danh mục</th>
                <th className="text-left p-4">Thương hiệu</th>
                <th className="text-right p-4">Giá</th>
                <th className="text-right p-4">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-slate-100 dark:border-slate-700">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <span className="font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">{p.category}</td>
                  <td className="p-4">{p.brand}</td>
                  <td className="p-4 text-right font-medium">{formatPrice(p.price)}</td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => openEdit(p)} className="text-primary hover:underline">
                      Sửa
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:underline">
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">Chưa có sản phẩm nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleSave}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-lg font-bold mb-4">{editing ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</h2>

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <div className="space-y-3">
              <input
                placeholder="Tên sản phẩm"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent"
              />
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <input
                placeholder="Thương hiệu"
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent"
              />
              <input
                type="number"
                placeholder="Giá (VNĐ)"
                value={form.price || ''}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent"
              />
              <input
                placeholder="URL hình ảnh"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent"
              />
              <select
                value={form.badge}
                onChange={(e) => setForm({ ...form, badge: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800"
              >
                <option value="">Không badge</option>
                <option value="hot">Hot</option>
                <option value="sale">Sale</option>
              </select>
              {form.badge === 'sale' && (
                <input
                  type="number"
                  placeholder="% giảm giá"
                  value={form.salePercent}
                  onChange={(e) => setForm({ ...form, salePercent: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent"
                />
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-600"
              >
                Hủy
              </button>
              <button type="submit" disabled={saving} className="flex-1 btn-primary py-2 disabled:opacity-50">
                {saving ? 'Đang lưu...' : 'Lưu'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
