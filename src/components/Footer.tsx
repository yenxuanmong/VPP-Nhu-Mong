import { Link } from 'react-router-dom';
import { STORE, NAV_ITEMS } from '../utils/constants';

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 lg:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
                <img
    src="/images/TrangChu.png"
    alt="Văn Phòng Phẩm Như Mộng"
    className="w-12 h-12 rounded-full object-cover shadow-soft"
  />
              </div>
              <span className="font-bold text-primary">{STORE.shortName}</span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Giải pháp văn phòng phẩm và in ấn toàn diện cho doanh nghiệp và cá nhân tại Hoài Đức, Hà Nội.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-slate-800 dark:text-slate-200">Liên kết nhanh</h4>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-sm text-slate-500 hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-slate-800 dark:text-slate-200">Dịch vụ</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>Photocopy & In ấn</li>
              <li>In màu kỹ thuật số</li>
              <li>Scan & Số hóa</li>
              <li>Đóng gáy & Ép plastic</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-slate-800 dark:text-slate-200">Liên hệ</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li className="flex items-start gap-2">
                <span>📍</span> {STORE.address}
              </li>
              <li>
                <a href={`tel:${STORE.phone}`} className="hover:text-primary">📞 {STORE.phoneDisplay}</a>
              </li>
              <li>
                <a href={`mailto:${STORE.email}`} className="hover:text-primary">✉️ {STORE.email}</a>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="https://www.facebook.com/profile.php?id=61564848042026" className="w-10 h-10 rounded-xl bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform" aria-label="Facebook">f</a>
              <a href={`https://zalo.me/${STORE.phone}`} className="w-10 h-10 rounded-xl bg-[#0068FF] text-white flex items-center justify-center hover:scale-110 transition-transform" aria-label="Zalo">Z</a>
              <a href="#" className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center hover:scale-110 transition-transform" aria-label="TikTok">♪</a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} {STORE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
