import { useEffect, useState } from 'react';
import { api, type DashboardData } from '../../lib/api';
import { formatPrice } from '../../utils/format';

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.dashboard
      .get()
      .then(setData)
      .catch(() => setError('Không thể tải dữ liệu dashboard'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return <div className="text-red-500">{error || 'Lỗi tải dữ liệu'}</div>;
  }

  const { stats, productRankings, userRankings, monthlyRevenue, recentOrders } = data;
  const maxRevenue = Math.max(...monthlyRevenue.map((m) => Number(m.revenue)), 1);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tổng quan</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Doanh thu" value={formatPrice(stats.totalRevenue)} icon="💰" />
        <StatCard label="Người dùng" value={String(stats.totalUsers)} icon="👥" />
        <StatCard label="Đơn hàng" value={String(stats.totalOrders)} icon="📦" />
        <StatCard label="Đánh giá chờ duyệt" value={String(stats.pendingReviews)} icon="⭐" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-soft">
          <h2 className="font-bold mb-4">Doanh thu theo tháng</h2>
          {monthlyRevenue.length === 0 ? (
            <p className="text-slate-500 text-sm">Chưa có dữ liệu</p>
          ) : (
            <div className="space-y-3">
              {monthlyRevenue.map((m) => (
                <div key={m.month}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{m.month}</span>
                    <span className="font-medium">{formatPrice(Number(m.revenue))}</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${(Number(m.revenue) / maxRevenue) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-soft">
          <h2 className="font-bold mb-4">Đơn hàng gần đây</h2>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
                <div>
                  <p className="text-sm font-medium">{order.user.name}</p>
                  <p className="text-xs text-slate-500">
                    {order.items.map((i) => i.product.name).join(', ')}
                  </p>
                </div>
                <span className="text-sm font-semibold text-primary">{formatPrice(order.totalAmount)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-soft">
          <h2 className="font-bold mb-4">Xếp hạng sản phẩm</h2>
          <div className="space-y-3">
            {productRankings.map((item) => (
              <div key={item.rank} className="flex items-center gap-3">
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  {item.rank}
                </span>
                {item.product?.image && (
                  <img src={item.product.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.product?.name || 'N/A'}</p>
                  <p className="text-xs text-slate-500">{item.totalQuantity} sản phẩm · {item.orderCount} đơn</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-soft">
          <h2 className="font-bold mb-4">Xếp hạng người dùng</h2>
          <div className="space-y-3">
            {userRankings.map((item) => (
              <div key={item.rank} className="flex items-center gap-3">
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-accent/10 text-accent text-sm font-bold">
                  {item.rank}
                </span>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                  {item.user?.name?.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.user?.name || 'N/A'}</p>
                  <p className="text-xs text-slate-500">{item.orderCount} đơn · {formatPrice(item.totalSpent)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
