import { BRANDS } from '../utils/constants';

export default function BrandCarousel() {
  const items = [...BRANDS, ...BRANDS];

  return (
    <div className="overflow-hidden py-6 mask-gradient">
      <div className="flex gap-8 animate-brand-slide w-max">
        {items.map((brand, i) => (
          <div
            key={`${brand}-${i}`}
            className="flex-shrink-0 w-36 h-16 glass rounded-xl flex items-center justify-center hover:scale-105 transition-transform"
          >
            <span className="font-extrabold text-slate-400 tracking-wider text-sm">{brand}</span>
          </div>
        ))}
      </div>
      <style>{`
        .mask-gradient {
          mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </div>
  );
}
