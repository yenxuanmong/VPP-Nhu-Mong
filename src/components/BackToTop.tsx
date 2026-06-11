import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          aria-label="Về đầu trang"
          className="fixed left-4 bottom-4 z-40 w-11 h-11 bg-white dark:bg-slate-800 text-primary rounded-full shadow-card border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}
