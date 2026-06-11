import { motion } from 'framer-motion';
import type { Product } from '../types';
import { formatPrice } from '../utils/format';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-soft border border-slate-100 dark:border-slate-700 card-lift group"
    >
      <div className="relative aspect-square bg-slate-50 dark:bg-slate-700/50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.badge === 'hot' && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-accent text-white text-xs font-bold rounded-full">
            Hot
          </span>
        )}
        {product.badge === 'sale' && product.salePercent && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary text-white text-xs font-bold rounded-full">
            Sale {product.salePercent}%
          </span>
        )}
      </div>
      <div className="p-4 relative">
        <p className="text-xs text-slate-400 mb-1">{product.category} · {product.brand}</p>
        <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-100 mb-2 line-clamp-2">{product.name}</h3>
        <p className="font-bold text-primary">{formatPrice(product.price)}</p>
        <button
          type="button"
          onClick={() => onAddToCart?.(product)}
          aria-label={`Thêm ${product.name} vào giỏ`}
          className="absolute bottom-4 right-4 w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center shadow-soft hover:bg-primary-dark transition-colors"
        >
          +
        </button>
      </div>
    </motion.div>
  );
}
