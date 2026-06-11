import { useEffect, useState } from 'react';
import { api, type DbReview } from '../../lib/api';

const statusLabels: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Chờ duyệt', color: 'bg-yellow-100 text-yellow-700' },
  APPROVED: { label: 'Đã duyệt', color: 'bg-green-100 text-green-700' },
  REJECTED: { label: 'Từ chối', color: 'bg-red-100 text-red-700' },
};

export default function AdminReviews() {
  const [reviews, setReviews] = useState<DbReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    api.reviews
      .listAdmin()
      .then(setReviews)
      .finally(() => setLoading(false));
  }, []);

  async function updateStatus(id: string, status: string) {
    // Optimistic update: change status in list immediately
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: status as DbReview['status'] } : r)),
    );
    try {
      await api.reviews.updateStatus(id, status);
    } catch {
      alert('Không thể cập nhật trạng thái');
      // Revert on failure
      api.reviews.listAdmin().then(setReviews);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Bạn có chắc muốn xóa đánh giá này?')) return;
    // Optimistic remove immediately
    setReviews((prev) => prev.filter((r) => r.id !== id));
    try {
      await api.reviews.delete(id);
    } catch {
      alert('Không thể xóa đánh giá');
      // Revert on failure
      api.reviews.listAdmin().then(setReviews);
    }
  }

  const filtered = filter === 'ALL' ? reviews : reviews.filter((r) => r.status === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Quản lý đánh giá</h1>
        <div className="flex gap-2">
          {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filter === s
                  ? 'bg-primary text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {s === 'ALL' ? 'Tất cả' : statusLabels[s]?.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-slate-500 text-center py-12">Không có đánh giá nào</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((review) => (
            <div key={review.id} className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-soft">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold shrink-0">
                    {review.avatar || review.name.slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{review.name}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${statusLabels[review.status]?.color}`}>
                        {statusLabels[review.status]?.label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {review.role} · {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                    </p>
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-slate-300'}>
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{review.text}</p>
                    {review.product && (
                      <p className="mt-1 text-xs text-primary">Sản phẩm: {review.product.name}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1 shrink-0">
                  {review.status !== 'APPROVED' && (
                    <button
                      onClick={() => updateStatus(review.id, 'APPROVED')}
                      className="text-xs text-green-600 hover:underline"
                    >
                      Duyệt
                    </button>
                  )}
                  {review.status !== 'REJECTED' && (
                    <button
                      onClick={() => updateStatus(review.id, 'REJECTED')}
                      className="text-xs text-yellow-600 hover:underline"
                    >
                      Từ chối
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
