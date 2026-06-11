import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Testimonial } from '../types';

interface Props {
  items: Testimonial[];
}

const ITEMS_PER_PAGE = 3;
const AUTO_PLAY_INTERVAL = 4000;

export default function TestimonialCarousel({ items }: Props) {
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = left→right, -1 = right→left

  // Auto advance
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setPage((prev) => (prev + 1) % totalPages);
    }, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [totalPages]);

  const goTo = (next: number) => {
    setDirection(next > page ? 1 : -1);
    setPage(next);
  };

  const currentItems = items.slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="grid md:grid-cols-3 gap-6"
        >
          {currentItems.map((t) => (
            <div key={t.id} className="glass rounded-2xl p-6 card-lift">
              <div className="text-yellow-400 mb-3">{'★'.repeat(t.rating)}</div>
              <p className="text-sm italic text-slate-600 dark:text-slate-300 mb-4">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center text-sm font-bold">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-slate-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Trang ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === page
                ? 'w-6 bg-primary'
                : 'w-2 bg-slate-300 dark:bg-slate-600 hover:bg-primary/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
