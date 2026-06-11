import Reveal from '../components/Reveal';
import ContactForm from '../components/ContactForm';
import { STORE } from '../utils/constants';

export default function Contact() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-primary/5 to-white dark:from-primary/10 dark:to-slate-900">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <Reveal>
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary mb-4">Liên hệ với chúng tôi</h1>
            <p className="text-slate-500 max-w-2xl mx-auto">
              {STORE.shortName} luôn sẵn sàng lắng nghe và hỗ trợ mọi nhu cầu về văn phòng phẩm và giải pháp in ấn chuyên nghiệp của bạn.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left - Info */}
            <div className="lg:col-span-2 space-y-6">
              <Reveal direction="left">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-soft border border-slate-100 dark:border-slate-700 space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-xl shrink-0">📍</div>
                    <div>
                      <h4 className="font-semibold mb-1">Địa chỉ</h4>
                      <p className="text-sm text-slate-500">{STORE.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-xl shrink-0">📞</div>
                    <div>
                      <h4 className="font-semibold mb-1">Hotline</h4>
                      <a href={`tel:${STORE.phone}`} className="text-sm text-primary hover:text-accent">{STORE.phoneDisplay}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-xl shrink-0">✉️</div>
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <a href={`mailto:${STORE.email}`} className="text-sm text-primary hover:text-accent">{STORE.email}</a>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal direction="left" delay={0.1}>
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-soft border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xl">🕒</span>
                    <h4 className="font-semibold">Giờ mở cửa</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Thứ 2 - Thứ 6</span>
                      <span className="font-medium">{STORE.hours.weekday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Thứ 7 - Chủ Nhật</span>
                      <span className="font-medium">{STORE.hours.weekend}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-4 italic">
                    * Hỗ trợ đơn hàng lớn 24/7 qua hotline
                  </p>
                </div>
              </Reveal>

              <Reveal direction="left" delay={0.2}>
                <div className="flex gap-3">
                  <a
                    href={`https://zalo.me/${STORE.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#0068FF] text-[#0068FF] font-semibold text-sm hover:bg-[#0068FF] hover:text-white transition-colors"
                  >
                    💬 Zalo Chat
                  </a>
                  <a
                    href="https://m.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#0084FF] text-[#0084FF] font-semibold text-sm hover:bg-[#0084FF] hover:text-white transition-colors"
                  >
                    💭 Messenger
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right - Form */}
            <div className="lg:col-span-3">
              <Reveal direction="right">
                <ContactForm />
              </Reveal>
            </div>
          </div>

          {/* Map */}
          <Reveal className="mt-12">
            <div className="relative rounded-2xl overflow-hidden shadow-lift">
              <div className="absolute top-4 left-4 z-10 glass px-4 py-3 rounded-xl text-sm font-medium max-w-xs">
                📍 Vị trí của chúng tôi — {STORE.address}
              </div>
            <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-xl">
  <iframe
    title="Bản đồ Văn Phòng Phẩm Như Mộng"
    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14893.61958761362!2d105.6999126!3d21.0564847!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345500359a9939%3A0x43be10bd425ecfad!2zVsSDbiBQaMOybmcgUGjhuqltIE5oxrAgTeG7mW5n!5e0!3m2!1svi!2s!4v1781161428239!5m2!1svi!2s"
    width="100%"
    height="500"
    style={{ border: 0 }}
    loading="lazy"
    allowFullScreen
    referrerPolicy="no-referrer-when-downgrade"
    className="w-full"
  />
</div>

            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
