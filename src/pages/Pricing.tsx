import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { api, type DbPricingRow } from '../lib/api';
import { STORE } from '../utils/constants';

const TABS = [
  { id: 'all', label: 'Tất cả dịch vụ', icon: '📋' },
  { id: 'photocopy', label: 'Photocopy / In đen trắng', icon: '📄' },
  { id: 'color', label: 'In Màu Laser', icon: '🎨' },
  { id: 'binding', label: 'Đóng sách / Gia công', icon: '📚' },
];

export default function Pricing() {
  const [activeTab, setActiveTab] = useState('all');
  const [rows, setRows] = useState<DbPricingRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.pricing
      .list()
      .then(setRows)
      .finally(() => setLoading(false));
  }, []);

  const filteredRows = rows
    .filter((row) => activeTab === 'all' || row.category === activeTab)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-primary/5 to-white dark:from-primary/10 dark:to-slate-900">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <Reveal>
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary mb-4">Bảng Giá Dịch Vụ</h1>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Cam kết chất lượng in ấn sắc nét với mức giá cạnh tranh nhất khu vực Hoài Đức
            </p>
          </Reveal>
        </div>
      </section>

      {/* Tabs */}
      <section className="pb-8">
        <div className="container mx-auto px-4 lg:px-6">
          <Reveal>
            <div className="flex flex-wrap justify-center gap-3">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary text-white shadow-soft'
                      : 'border border-slate-200 dark:border-slate-600 text-slate-600 hover:border-primary hover:text-primary'
                  }`}
                >
                  <span>{tab.icon}</span> {tab.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing Table + Promo */}
      <section className="pb-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            <Reveal className="lg:col-span-2">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center gap-3">
                  <span className="text-2xl">📄</span>
                  <h2 className="font-bold text-lg">Dịch vụ Photocopy & In ấn</h2>
                </div>
                <div className="overflow-x-auto">
                  {loading ? (
                    <div className="flex justify-center py-12">
                      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : filteredRows.length === 0 ? (
                    <p className="text-center text-slate-500 py-12">Chưa có bảng giá</p>
                  ) : (
                    <table className="w-full">
                      <thead>
                        <tr className="bg-primary text-white text-sm">
                          <th className="text-left p-4 font-semibold">Quy cách</th>
                          <th className="text-left p-4 font-semibold">Định lượng</th>
                          <th className="text-left p-4 font-semibold">Số lượng</th>
                          <th className="text-left p-4 font-semibold">Đơn giá</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRows.map((row) => (
                          <tr
                            key={row.id}
                            className="border-b border-slate-100 dark:border-slate-700 hover:bg-primary/5 transition-colors"
                          >
                            <td className="p-4 text-sm font-medium">{row.format}</td>
                            <td className="p-4 text-sm text-slate-500">{row.weight}</td>
                            <td className="p-4 text-sm text-slate-500">{row.quantity}</td>
                            <td className="p-4 text-lg font-bold text-red-500">{row.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.1}>
              <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-white shadow-lift relative overflow-hidden">
                <span className="absolute top-4 right-4 px-3 py-1 bg-accent text-white text-xs font-bold rounded-full">
                  Ưu đãi độc quyền
                </span>
                <h3 className="font-extrabold text-xl mb-4 mt-6">Combo Doanh Nghiệp</h3>
                <ul className="space-y-3 text-sm text-white/90 mb-6">
                  <li className="flex items-center gap-2"><span>✓</span> Giảm 20% đơn in số lượng lớn</li>
                  <li className="flex items-center gap-2"><span>✓</span> Miễn phí giao hàng đơn từ 500k</li>
                  <li className="flex items-center gap-2"><span>✓</span> Hỗ trợ xuất hóa đơn VAT</li>
                </ul>
                <Link to="/lien-he" className="block text-center bg-white text-primary font-bold py-3 rounded-full hover:shadow-soft transition">
                  Nhận báo giá riêng
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Secondary Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Reveal delay={0.1}>
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-soft border border-slate-100 dark:border-slate-700 card-lift">
                <div className="text-3xl mb-3">🎓</div>
                <h3 className="font-bold mb-2">Học sinh - Sinh viên</h3>
                <p className="text-sm text-slate-500">Giảm 10% photocopy và in ấn khi xuất trình thẻ sinh viên.</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-soft border border-slate-100 dark:border-slate-700 card-lift">
                <div className="text-3xl mb-3">📑</div>
                <h3 className="font-bold mb-2">Số hóa tài liệu</h3>
                <p className="text-sm text-slate-500 mb-2">Scan tài liệu chất lượng cao:</p>
                <p className="text-primary font-bold">1.000đ - 500đ/trang</p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-soft border border-slate-100 dark:border-slate-700 card-lift">
                <div className="text-3xl mb-3">📚</div>
                <h3 className="font-bold mb-2">Gia công đóng sổ</h3>
                <p className="text-sm text-slate-500 mb-2">Đóng lò xo, bìa cứng:</p>
                <p className="text-primary font-bold">Từ 5.000đ</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Quote Request */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-6">
          <Reveal>
            <div className="rounded-3xl border-2 border-dashed border-primary/30 bg-primary/5 p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <img
                  src="https://images.unsplash.com/photo-1612815154855-874899a39ec3?w=500&h=400&fit=crop"
                  alt="Máy in chuyên nghiệp"
                  loading="lazy"
                  className="rounded-2xl shadow-lift w-full"
                />
                <div>
                  <h2 className="text-2xl font-extrabold text-primary mb-4">Bạn cần báo giá số lượng lớn?</h2>
                  <p className="text-slate-500 mb-6">Điền thông tin để nhận báo giá nhanh chóng từ đội ngũ tư vấn.</p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const qty = (form.elements.namedItem('quantity') as HTMLInputElement).value;
                      const size = (form.elements.namedItem('paperSize') as HTMLSelectElement).value;
                      const text = `Yêu cầu báo giá: ${qty} bản, khổ ${size}`;
                      window.open(`https://zalo.me/${STORE.phone}?text=${encodeURIComponent(text)}`, '_blank');
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium mb-2">Số lượng bản in</label>
                      <input
                        id="quantity"
                        name="quantity"
                        type="number"
                        min={1}
                        required
                        placeholder="VD: 500"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                    <div>
                      <label htmlFor="paperSize" className="block text-sm font-medium mb-2">Khổ giấy</label>
                      <select
                        id="paperSize"
                        name="paperSize"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/30"
                      >
                        <option>A4</option>
                        <option>A3</option>
                        <option>A5</option>
                      </select>
                    </div>
                    <button type="submit" className="btn-primary w-full">Gửi yêu cầu báo giá</button>
                  </form>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
