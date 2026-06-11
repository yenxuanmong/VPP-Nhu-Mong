import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import ProductCard from '../components/ProductCard';
import { api, type DbProduct } from '../lib/api';
import { categories, filterBrands } from '../data/products';
import { formatPrice } from '../utils/format';

const ITEMS_PER_PAGE = 9;

// Map DbProduct → the shape ProductCard expects
function toCardProduct(p: DbProduct) {
  return {
    id: p.id,
    name: p.name,
    category: p.category,
    brand: p.brand,
    price: p.price,
    image: p.image,
    badge: (p.badge as 'hot' | 'sale' | undefined) ?? undefined,
    salePercent: p.salePercent ?? undefined,
  };
}

export default function Products() {
  const [allProducts, setAllProducts] = useState<DbProduct[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');
  const [page, setPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    api.products
      .list()
      .then(setAllProducts)
      .finally(() => setFetchLoading(false));
  }, []);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
    setPage(1);
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
    setPage(1);
  };

  const filtered = useMemo(() => {
    let result = allProducts.filter((p) => p.price <= maxPrice);

    if (selectedCategories.length) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }
    if (selectedBrands.length) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    if (sortBy === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);

    return result;
  }, [allProducts, selectedCategories, selectedBrands, maxPrice, sortBy]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handlePageChange = (p: number) => {
    setPageLoading(true);
    setPage(p);
    setTimeout(() => setPageLoading(false), 300);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Derive category list from actual data (fallback to static list)
  const dynamicCategories = useMemo(() => {
    const fromDb = [...new Set(allProducts.map((p) => p.category))];
    return fromDb.length > 0 ? fromDb : [...categories];
  }, [allProducts]);

  const dynamicBrands = useMemo(() => {
    const fromDb = [...new Set(allProducts.map((p) => p.brand))];
    return fromDb.length > 0 ? fromDb : [...filterBrands];
  }, [allProducts]);

  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-primary/5 to-white dark:from-primary/10 dark:to-slate-900">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <Reveal>
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary mb-4">Danh Mục Sản Phẩm</h1>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Văn phòng phẩm và thiết bị in ấn chính hãng, giá tốt nhất thị trường
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1 space-y-6">
              <Reveal direction="left">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-soft border border-slate-100 dark:border-slate-700">
                  <h3 className="font-bold mb-4">Bộ lọc</h3>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-500 mb-3">Danh mục</h4>
                    <div className="space-y-2">
                      {dynamicCategories.map((cat) => (
                        <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(cat)}
                            onChange={() => toggleCategory(cat)}
                            className="rounded border-slate-300 text-primary focus:ring-primary"
                          />
                          {cat}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-500 mb-3">
                      Khoảng giá: 0đ - {(maxPrice / 1000000).toFixed(0)}tr+
                    </h4>
                    <input
                      type="range"
                      min={50000}
                      max={10000000}
                      step={50000}
                      value={maxPrice}
                      onChange={(e) => { setMaxPrice(Number(e.target.value)); setPage(1); }}
                      className="w-full accent-primary"
                    />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-500 mb-3">Thương hiệu</h4>
                    <div className="flex flex-wrap gap-2">
                      {dynamicBrands.map((brand) => (
                        <button
                          key={brand}
                          type="button"
                          onClick={() => toggleBrand(brand)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                            selectedBrands.includes(brand)
                              ? 'bg-primary text-white'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-primary/10'
                          }`}
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-white mt-6 shadow-lift">
                  <h3 className="font-bold text-lg mb-2">Ưu đãi in ấn</h3>
                  <p className="text-sm text-white/80 mb-4">Giảm 15% cho đơn hàng doanh nghiệp từ 500 bản in.</p>
                  <Link to="/lien-he" className="inline-block bg-white text-primary font-semibold px-5 py-2 rounded-full text-sm hover:shadow-soft transition">
                    Tìm hiểu thêm
                  </Link>
                </div>
              </Reveal>
            </aside>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              {fetchLoading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="skeleton h-72" />
                  ))}
                </div>
              ) : (
                <>
                  <Reveal className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <p className="text-sm text-slate-500">
                      Hiển thị {paginated.length} trên {filtered.length} sản phẩm
                    </p>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                      className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      <option value="newest">Sắp xếp: Mới nhất</option>
                      <option value="price-asc">Giá: Thấp → Cao</option>
                      <option value="price-desc">Giá: Cao → Thấp</option>
                    </select>
                  </Reveal>

                  {pageLoading ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="skeleton h-72" />
                      ))}
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {paginated.map((p, i) => (
                        <Reveal key={p.id} delay={i * 0.05}>
                          <ProductCard
                            product={toCardProduct(p)}
                            onAddToCart={() => window.open('/lien-he', '_self')}
                          />
                        </Reveal>
                      ))}
                    </div>
                  )}

                  {filtered.length === 0 && (
                    <p className="text-center text-slate-500 py-12">Không tìm thấy sản phẩm phù hợp.</p>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-10">
                      <button
                        type="button"
                        onClick={() => handlePageChange(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-600 disabled:opacity-40 hover:bg-primary/10 transition"
                      >
                        ←
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => handlePageChange(p)}
                          className={`w-10 h-10 rounded-xl font-medium transition ${
                            page === p ? 'bg-primary text-white' : 'border border-slate-200 dark:border-slate-600 hover:bg-primary/10'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                        disabled={page === totalPages}
                        className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-600 disabled:opacity-40 hover:bg-primary/10 transition"
                      >
                        →
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-surface dark:bg-slate-900/50">
        <div className="container mx-auto px-4 lg:px-6 max-w-xl text-center">
          <Reveal>
            <h2 className="text-2xl font-bold mb-3">Bản tin khuyến mãi</h2>
            <p className="text-slate-500 text-sm mb-6">Nhận báo giá và thông tin khuyến mãi mới nhất</p>
            <form onSubmit={(e) => { e.preventDefault(); }} className="flex gap-2">
              <input
                type="email"
                placeholder="Email của bạn"
                required
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button type="submit" className="btn-primary shrink-0">Đăng ký</button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
