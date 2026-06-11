import { motion } from 'framer-motion';
import { STORE } from '../utils/constants';

export default function FloatingButtons() {
  const buttons = [
    { href: `https://zalo.me/${STORE.phone}`, label: 'Zalo', icon: '💬', color: 'bg-[#0068FF]' },
    { href: 'https://www.messenger.com/e2ee/t/9759545470779358/?source_id=8585216', label: 'Messenger', icon: '💭', color: 'bg-[#0084FF]' },
    { href: `tel:${STORE.phone}`, label: 'Gọi điện', icon: '📞', color: 'bg-primary' },
  ];

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3">
      <span className="text-xs font-medium text-primary bg-white dark:bg-slate-800 px-3 py-1 rounded-full shadow-soft hidden sm:block">
        Hỗ trợ 24/7
      </span>
      {buttons.map((btn, i) => (
        <motion.a
          key={btn.label}
          href={btn.href}
          target={btn.href.startsWith('http') ? '_blank' : undefined}
          rel="noopener noreferrer"
          aria-label={btn.label}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + i * 0.1 }}
          whileHover={{ scale: 1.1 }}
          className={`w-12 h-12 ${btn.color} text-white rounded-full flex items-center justify-center shadow-lift text-lg`}
        >
          {btn.icon}
        </motion.a>
      ))}
    </div>
  );
}
