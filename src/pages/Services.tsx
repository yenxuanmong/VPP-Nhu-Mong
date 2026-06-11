import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import ServiceCard from '../components/ServiceCard';
import { pageServices, processSteps } from '../data/services';
import { STORE } from '../utils/constants';

export default function Services() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-primary/5 to-white dark:from-primary/10 dark:to-slate-900">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <Reveal>
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-6">
              Giải pháp in ấn chuyên nghiệp
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary mb-6 leading-tight">
              Dịch Vụ Toàn Diện Cho Mọi<br />Nhu Cầu In Ấn
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Hệ sinh thái văn phòng phẩm và in ấn hiện đại, phục vụ cá nhân và doanh nghiệp tại {STORE.address}.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Service Cards Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {pageServices.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.08}>
                <ServiceCard service={s} variant="page" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Banner */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <Reveal>
            <div className="rounded-3xl bg-gradient-to-r from-primary to-secondary p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lift">
              <div className="text-white">
                <div className="text-4xl mb-4">🚚</div>
                <h2 className="text-2xl md:text-3xl font-extrabold mb-3">Giao hàng nhanh tận nơi</h2>
                <p className="text-white/80 mb-4 max-w-lg">
                  Giao hàng nội thành trong 2 giờ. Bảo hiểm tài liệu, theo dõi đơn hàng realtime.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Nội thành 2H</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Bảo hiểm tài liệu</span>
                </div>
              </div>
              <Link to="/lien-he" className="bg-white text-primary font-bold px-8 py-4 rounded-full shadow-soft hover:shadow-lift transition-all hover:-translate-y-1 shrink-0">
                Đặt giao ngay
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Working Process */}
      <section className="section-padding bg-surface dark:bg-slate-900/50">
        <div className="container mx-auto px-4 lg:px-6">
          <Reveal className="text-center mb-14">
            <h2 className="text-3xl font-extrabold">Quy trình làm việc <span className="text-gradient">chuyên nghiệp</span></h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-primary/20" />
            {processSteps.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.12}>
                <div className="text-center relative">
                  <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-white dark:bg-slate-800 border-4 border-primary/20 flex items-center justify-center text-3xl shadow-soft relative z-10">
                    {step.icon}
                  </div>
                  <div className="w-8 h-8 mx-auto -mt-12 mb-4 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold relative z-20">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
