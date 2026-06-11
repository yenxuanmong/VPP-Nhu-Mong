import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { STORE } from '../utils/constants';

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-white dark:bg-slate-900 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl text-white shadow-lift"
            >
              🖨️
            </motion.div>
            <p className="font-semibold text-slate-700 dark:text-slate-200 mb-4">{STORE.shortName}</p>
            <div className="w-48 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mx-auto">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
