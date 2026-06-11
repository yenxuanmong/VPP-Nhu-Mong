import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  variant?: 'grid' | 'page';
}

export default function ServiceCard({ service, variant = 'grid' }: ServiceCardProps) {
  if (variant === 'page') {
    const sizeClass =
      service.size === 'large'
        ? 'md:col-span-2 md:row-span-2'
        : service.size === 'medium'
          ? 'md:col-span-1 md:row-span-2'
          : '';

    return (
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        className={`bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-700 overflow-hidden card-lift ${sizeClass}`}
      >
        {service.image && (
          <div className={`overflow-hidden ${service.size === 'large' ? 'h-48 md:h-64' : 'h-36'}`}>
            <img
              src={service.image}
              alt={service.title}
              loading="lazy"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl">{service.icon}</span>
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">{service.title}</h3>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{service.description}</p>
          {service.features && (
            <ul className="space-y-1 mb-3">
              {service.features.map((f) => (
                <li key={f} className="text-sm text-green-600 flex items-center gap-2">
                  <span>✓</span> {f}
                </li>
              ))}
            </ul>
          )}
          {service.tags && (
            <div className="flex gap-2 flex-wrap">
              {service.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
          {service.link && (
            <Link to={service.link} className="text-sm text-primary font-semibold mt-3 inline-block hover:text-accent">
              Xem chi tiết →
            </Link>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-soft border border-slate-100 dark:border-slate-700 card-lift group"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
        {service.icon}
      </div>
      <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">{service.title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">{service.description}</p>
    </motion.div>
  );
}
