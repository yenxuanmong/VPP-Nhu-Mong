import type { Testimonial, FAQ, Stat, PricingRow } from '../types';

export const stats: Stat[] = [
  { value: '10', suffix: '+', label: 'Năm kinh nghiệm' },
  { value: '5000', suffix: '+', label: 'Khách hàng' },
  { value: '50000', suffix: '+', label: 'Đơn hàng' },
  { value: '98', suffix: '%', label: 'Hài lòng' },
];

export const benefits = [
  { icon: '🛡️', title: 'Uy tín', desc: 'Phục vụ tận tâm, đáng tin cậy', color: 'bg-blue-500' },
  { icon: '👍', title: 'Chất lượng', desc: 'Sản phẩm tốt, in ấn sắc nét', color: 'bg-pink-500' },
  { icon: '🏷️', title: 'Giá tốt', desc: 'Hợp lý, tiết kiệm', color: 'bg-green-500' },
  { icon: '⚡', title: 'Nhanh chóng', desc: 'Xử lý nhanh, đúng hẹn', color: 'bg-accent' },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Nguyễn Thành',
    role: 'Doanh nghiệp',
    text: 'In cực nhanh, giá tốt. Mình thường xuyên đến đây photocopy tài liệu cho công ty.',
    rating: 5,
    avatar: 'NT',
  },
  {
    id: '2',
    name: 'Lê Hương',
    role: 'Sinh viên',
    text: 'Dịch vụ chuyên nghiệp, nhân viên nhiệt tình. Giao hàng đúng hẹn.',
    rating: 5,
    avatar: 'LH',
  },
  {
    id: '3',
    name: 'Vũ Minh',
    role: 'Văn phòng',
    text: 'Mực in chính hãng, chất lượng tốt. Giá rẻ hơn nhiều chỗ khác.',
    rating: 5,
    avatar: 'VM',
  },
  {
    id: '4',
    name: 'Trần Bảo Châu',
    role: 'Giáo viên',
    text: 'In đề thi số lượng lớn rất nhanh, không bị nhòe mực, giá cả hợp lý. Sẽ tiếp tục ủng hộ!',
    rating: 5,
    avatar: 'BC',
  },
  {
    id: '5',
    name: 'Phạm Quốc Hùng',
    role: 'Kỹ sư',
    text: 'Mua mực máy in tại đây chính hãng, bền, giá rẻ hơn mua online. Nhân viên tư vấn rất tốt.',
    rating: 5,
    avatar: 'QH',
  },
  {
    id: '6',
    name: 'Ngô Thị Mai',
    role: 'Kế toán',
    text: 'In hóa đơn, báo cáo cho công ty rất ổn. Xuất VAT nhanh, không cần chờ lâu.',
    rating: 5,
    avatar: 'TM',
  },
  {
    id: '7',
    name: 'Đặng Văn Tú',
    role: 'Sinh viên',
    text: 'Photocopy giáo trình giá rẻ, chất lượng rõ nét. Địa điểm thuận tiện, hay ghé vào buổi sáng.',
    rating: 5,
    avatar: 'VT',
  },
  {
    id: '8',
    name: 'Hoàng Lan Anh',
    role: 'Thiết kế',
    text: 'In ấn catalogue màu sắc rất chuẩn, trung thực với file gốc. Đúng hẹn, đóng gói cẩn thận.',
    rating: 5,
    avatar: 'LA',
  },
  {
    id: '9',
    name: 'Bùi Thanh Tùng',
    role: 'Văn phòng',
    text: 'Mua văn phòng phẩm số lượng lớn được giảm giá tốt. Hàng đầy đủ, nhân viên vui vẻ nhiệt tình.',
    rating: 5,
    avatar: 'TT',
  },
];

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'In tài liệu lấy ngay được không?',
    answer: 'Có, với đơn hàng in đen trắng và photocopy thông thường, bạn có thể lấy ngay trong 5-15 phút tùy số lượng.',
  },
  {
    id: '2',
    question: 'Có giao tận nơi không?',
    answer: 'Có, chúng tôi giao hàng miễn phí trong bán kính 10km tại Hoài Đức. Đơn hàng lớn giao trong ngày.',
  },
  {
    id: '3',
    question: 'Có xuất hóa đơn VAT không?',
    answer: 'Có, chúng tôi hỗ trợ xuất hóa đơn VAT cho khách hàng doanh nghiệp và cá nhân có nhu cầu.',
  },
  {
    id: '4',
    question: 'Có nhận in số lượng lớn không?',
    answer: 'Có, chúng tôi nhận in số lượng lớn với giá ưu đãi. Liên hệ hotline để nhận báo giá riêng.',
  },
];

export const pricingRows: PricingRow[] = [
  { format: 'A4 (1 mặt)', weight: '80gsm', quantity: '1-100', price: '300đ' },
  { format: 'A4 (2 mặt)', weight: '80gsm', quantity: '1-100', price: '500đ' },
  { format: 'A3', weight: '80gsm', quantity: '1-50', price: '800đ' },
  { format: 'In màu Laser A4', weight: '80gsm', quantity: '1-50', price: '2.000đ' },
];

export const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=500&fit=crop', alt: 'Máy photocopy' },
  { src: 'https://images.unsplash.com/photo-1612815154855-874899a39ec3?w=1200&h=600&fit=crop', alt: 'Không gian cửa hàng' },
  { src: 'https://images.unsplash.com/photo-1583485080605-87bce1a37e8c?w=600&h=400&fit=crop', alt: 'Văn phòng phẩm' },
  { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop', alt: 'Quầy bán hàng' },
];
