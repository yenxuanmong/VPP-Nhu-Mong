import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Reveal from '../components/Reveal';
import ServiceCard from '../components/ServiceCard';
import ProductCard from '../components/ProductCard';
import BrandCarousel from '../components/BrandCarousel';
import TestimonialCarousel from '../components/TestimonialCarousel';
import FAQAccordion from '../components/FAQAccordion';
import { homeServices } from '../data/services';
import { products } from '../data/products';
import { stats, benefits, testimonials, faqs, galleryImages } from '../data/content';
import { STORE, HERO_SERVICES } from '../utils/constants';

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <>
      {/* Hero Split Layout */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-primary/5 dark:from-slate-900 dark:via-slate-900 dark:to-primary/10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-6 py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal direction="left">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-6">
                {STORE.slogan}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                <span className="text-gradient">VĂN PHÒNG PHẨM</span>
                <br />
                <span className="text-primary">NHƯ MỘNG</span>
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 mb-8">
                In Ấn - Photocopy - Máy In - Văn Phòng Phẩm
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/lien-he" className="btn-primary">Đặt hàng ngay</Link>
                <Link to="/dich-vu" className="btn-outline">Xem dịch vụ</Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center p-3 glass rounded-xl">
                    <div className="text-2xl font-extrabold text-primary">
                      {stat.value}{stat.suffix}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.2}>
              <motion.div style={{ y }} className="relative">
                <img
                  src="https://i.pinimg.com/736x/49/02/cd/4902cddedb69b1d579a3c6b8e5adb98f.jpg"
                  alt="Máy in chuyên nghiệp"
                  loading="eager"
                  className="rounded-3xl shadow-lift w-full"
                />
                {['🖨️', '📄', '✏️', '📁'].map((icon, i) => (
                  <motion.div
                    key={icon}
                    animate={{ y: [0, -12, 0] }}
                    transition={{ repeat: Infinity, duration: 3 + i, delay: i * 0.5 }}
                    className="absolute w-14 h-14 glass rounded-2xl flex items-center justify-center text-2xl shadow-soft"
                    style={{
                      top: `${15 + i * 18}%`,
                      right: i % 2 === 0 ? '-20px' : 'auto',
                      left: i % 2 === 1 ? '-20px' : 'auto',
                    }}
                  >
                    {icon}
                  </motion.div>
                ))}
              </motion.div>
            </Reveal>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-16">
            {HERO_SERVICES.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div className="flex flex-col items-center gap-2 text-center">
                  <span className="text-2xl">{s.icon}</span>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Banner */}
      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-6">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-secondary shadow-lift">
              <div className="absolute inset-0 opacity-30">
                <img
                  src="https://images.unsplash.com/photo-1583485080605-87bce1a37e8c?w=1200&h=600&fit=crop"
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="relative p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center mb-10">
                  ⭐ VÌ SAO CHỌN NHƯ MỘNG? ⭐
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {benefits.map((b) => (
                    <div key={b.title} className="glass rounded-2xl p-5 text-center">
                      <div className={`w-14 h-14 ${b.color} rounded-full flex items-center justify-center text-2xl mx-auto mb-3 shadow-soft`}>
                        {b.icon}
                      </div>
                      <h3 className="font-bold text-slate-800 mb-1">{b.title}</h3>
                      <p className="text-xs text-slate-500">{b.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 bg-red-600/90 rounded-2xl px-6 py-4 text-white text-sm font-medium">
                  <span>📍 {STORE.address}</span>
                  <span className="hidden sm:block">|</span>
                  <a href={`tel:${STORE.phone}`} className="hover:underline">☎ {STORE.phoneDisplay}</a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-surface dark:bg-slate-900/50">
        <div className="container mx-auto px-4 lg:px-6">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl font-extrabold mb-4">Dịch vụ <span className="text-gradient">chuyên nghiệp</span></h2>
            <p className="text-slate-500 max-w-xl mx-auto">Đa dạng dịch vụ in ấn phục vụ mọi nhu cầu</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeServices.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.08}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/dich-vu" className="btn-outline">Xem tất cả dịch vụ</Link>
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between mb-10">
            <Reveal>
              <h2 className="text-3xl font-extrabold">Văn phòng phẩm <span className="text-gradient">nổi bật</span></h2>
            </Reveal>
            <Link to="/san-pham" className="text-primary font-semibold text-sm hover:text-accent transition-colors">
              Xem tất cả →
            </Link>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {products.slice(0, 6).map((p, i) => (
              <div key={p.id} className="flex-shrink-0 w-64 snap-start">
                <Reveal delay={i * 0.05}>
                  <ProductCard product={p} />
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-12 bg-surface dark:bg-slate-900/50">
        <div className="container mx-auto px-4 lg:px-6">
          <Reveal className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-400">Thương hiệu đối tác</h2>
          </Reveal>
          <BrandCarousel />
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-6">
          <Reveal className="text-center mb-10">
            <h2 className="text-3xl font-extrabold">Không gian <span className="text-gradient">cửa hàng</span></h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-4">
            {galleryImages.map((img, i) => (
              <Reveal key={img.alt} delay={i * 0.1} className={i === 1 ? 'md:col-span-2' : ''}>
                <div className="rounded-2xl overflow-hidden group">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${
                      i === 1 ? 'h-72 md:h-96' : 'h-56'
                    }`}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-surface dark:bg-slate-900/50">
        <div className="container mx-auto px-4 lg:px-6">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl font-extrabold">Khách hàng <span className="text-gradient">nói gì</span>?</h2>
          </Reveal>
          <TestimonialCarousel items={testimonials} />
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container mx-auto px-4 lg:px-6">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl font-extrabold">Câu hỏi <span className="text-gradient">thường gặp</span></h2>
          </Reveal>
          <FAQAccordion items={faqs} />
        </div>
      </section>
    </>
  );
}
