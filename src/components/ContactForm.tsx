import { useState, type FormEvent } from 'react';
import { STORE } from '../utils/constants';

interface ContactFormProps {
  showEmail?: boolean;
  showService?: boolean;
  title?: string;
  variant?: 'full' | 'compact';
}

export default function ContactForm({
  showEmail = true,
  showService = true,
  title = 'Gửi tin nhắn cho Như Mộng',
  variant = 'full',
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get('name') as string;
    const phone = data.get('phone') as string;
    const message = data.get('message') as string;
    const text = `Xin chào, tôi là ${name} (${phone}). ${message}`;
    window.open(`https://zalo.me/${STORE.phone}?text=${encodeURIComponent(text)}`, '_blank');
    form.reset();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-700 ${
        variant === 'full' ? 'p-8' : 'p-6'
      }`}
    >
      <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100 mb-6">{title}</h3>

      <div className={`grid gap-4 ${variant === 'full' ? 'md:grid-cols-2' : ''}`}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">Họ và tên</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Nhập họ tên"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">Số điện thoại</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="Nhập số điện thoại"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
          />
        </div>
      </div>

      {showEmail && (
        <div className="mt-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="email@example.com"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
          />
        </div>
      )}

      {showService && (
        <div className="mt-4">
          <label htmlFor="service" className="block text-sm font-medium mb-2">Dịch vụ quan tâm</label>
          <select
            id="service"
            name="service"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
          >
            <option value="">Chọn dịch vụ</option>
            <option>Photocopy</option>
            <option>In màu</option>
            <option>Scan tài liệu</option>
            <option>Đóng gáy</option>
            <option>Ép plastic</option>
            <option>Văn phòng phẩm</option>
          </select>
        </div>
      )}

      <div className="mt-4">
        <label htmlFor="message" className="block text-sm font-medium mb-2">Nội dung yêu cầu</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Mô tả yêu cầu của bạn..."
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none"
        />
      </div>

      <button
        type="submit"
        className={`btn-primary w-full mt-6 ${submitted ? 'bg-green-500' : ''}`}
      >
        {submitted ? '✓ Đã gửi!' : 'Gửi yêu cầu ngay →'}
      </button>
    </form>
  );
}
