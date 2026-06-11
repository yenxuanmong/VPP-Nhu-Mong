import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function LoginPromptModal({ open, onClose }: Props) {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a8 8 0 00-8 8h16a8 8 0 00-8-8z"
                />
              </svg>
            </div>

            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
              Bạn chưa đăng nhập
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-7 leading-relaxed">
              Vui lòng đăng nhập để xem nội dung này.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  onClose();
                  navigate('/dang-nhap');
                }}
                className="btn-primary w-full justify-center py-3"
              >
                Đăng nhập ngay
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                Đóng
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
