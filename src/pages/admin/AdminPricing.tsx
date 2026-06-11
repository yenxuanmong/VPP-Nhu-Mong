import { useEffect, useState } from 'react';
import { api, type DbPricingRow } from '../../lib/api';

const categories = [
  { value: 'all', label: 'Tất cả' },
  { value: 'photocopy', label: 'Photocopy' },
  { value: 'color', label: 'In màu' },
  { value: 'binding', label: 'Đóng gáy' },
];

const emptyRow = {
  category: 'photocopy',
  format: '',
  weight: '',
  quantity: '',
  price: '',
  sortOrder: 0,
};

export default function AdminPricing() {
  const [rows, setRows] = useState<DbPricingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<DbPricingRow | null>(null);
  const [form, setForm] = useState(emptyRow);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.pricing
      .list()
      .then(setRows)
      .finally(() => setLoading(false));
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(emptyRow);
    setError('');
    setModalOpen(true);
  }

  function openEdit(row: DbPricingRow) {
    setEditing(row);
    setForm({
      category: row.category,
      format: row.format,
      weight: row.weight,
      quantity: row.quantity,
      price: row.price,
      sortOrder: row.sortOrder,
    });
    setError('');
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editing) {
        const updated = await api.pricing.update(editing.id, form);
        // Optimistic update: replace in list immediately
        setRows((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
      } else {
        const created = await api.pricing.create(form);
        // Optimistic update: append new row
        setRows((prev) => [...prev, created]);
      }
      setModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi lưu bảng giá');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Bạn có chắc muốn xóa dòng giá này?')) return;
    // Optimistic remove immediately
    setRows((prev) => prev.filter((r) => r.id !== id));
    try {
      await api.pricing.delete(id);
    } catch {
      alert('Không thể xóa dòng giá');
      // Revert on failure
      api.pricing.list().then(setRows);
    }
  }

  function getCategoryLabel(cat: string) {
    return categories.find((c) => c.value === cat)?.label || cat;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Quản lý bảng giá</h1>
        <button onClick={openCreate} className="btn-primary text-sm px-4 py-2">
          + Thêm dòng giá
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
                <th className="text-left p-4">Danh mục</th>
                <th className="text-left p-4">Định dạng</th>
                <th className="text-left p-4">Định lượng</th>
                <th className="text-left p-4">Số lượng</th>
                <th className="text-right p-4">Giá</th>
                <th className="text-right p-4">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-slate-100 dark:border-slate-700">
                  <td className="p-4">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {getCategoryLabel(row.category)}
                    </span>
                  </td>
                  <td className="p-4 font-medium">{row.format}</td>
                  <td className="p-4">{row.weight}</td>
                  <td className="p-4">{row.quantity}</td>
                  <td className="p-4 text-right font-semibold text-primary">{row.price}</td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => openEdit(row)} className="text-primary hover:underline">
                      Sửa
                    </button>
                    <button onClick={() => handleDelete(row.id)} className="text-red-500 hover:underline">
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">Chưa có dữ liệu bảng giá</td>
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
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md"
          >
            <h2 className="text-lg font-bold mb-4">{editing ? 'Sửa bảng giá' : 'Thêm bảng giá'}</h2>

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <div className="space-y-3">
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800"
              >
                {categories.filter((c) => c.value !== 'all').map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              <input
                placeholder="Định dạng (VD: A4 1 mặt)"
                value={form.format}
                onChange={(e) => setForm({ ...form, format: e.target.value })}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent"
              />
              <input
                placeholder="Định lượng (VD: 80gsm)"
                value={form.weight}
                onChange={(e) => setForm({ ...form, weight: e.target.value })}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent"
              />
              <input
                placeholder="Số lượng (VD: 1-100)"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent"
              />
              <input
                placeholder="Giá (VD: 300đ)"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent"
              />
              <input
                type="number"
                placeholder="Thứ tự hiển thị"
                value={form.sortOrder}
                onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent"
              />
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
