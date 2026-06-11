import type { Service, ProcessStep } from '../types';

export const homeServices: Service[] = [
  {
    id: 'photocopy',
    title: 'Photocopy',
    description: 'Photocopy đen trắng & màu, số lượng lớn, giá ưu đãi',
    icon: '📄',
  },
  {
    id: 'in-mau',
    title: 'In Màu Kỹ Thuật Số',
    description: 'In màu chất lượng cao, bền màu, đa dạng khổ giấy',
    icon: '🎨',
  },
  {
    id: 'scan',
    title: 'Scan Tài Liệu',
    description: 'Scan tài liệu sang PDF, chỉnh sửa và lưu trữ',
    icon: '📑',
  },
  {
    id: 'dong-gay',
    title: 'Đóng Gáy Sách',
    description: 'Đóng gáy lò xo, keo nhiệt, bìa cứng chuyên nghiệp',
    icon: '📚',
  },
  {
    id: 'ep-plastic',
    title: 'Ép Plastic',
    description: 'Ép plastic CMND, bằng cấp, thẻ nhân viên',
    icon: '🪪',
  },
  {
    id: 'giao-hang',
    title: 'Giao Hàng Nhanh',
    description: 'Giao hàng nhanh trong ngày tại Hoài Đức & lân cận',
    icon: '🚚',
  },
];

export const pageServices: Service[] = [
  {
    id: 'photocopy',
    title: 'Photocopy',
    description: 'Máy Ricoh công nghiệp, tốc độ 90 trang/phút, độ nét cao, giá cực rẻ.',
    icon: '📄',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=500&fit=crop',
    features: ['Độ nét cao', 'Giá cực rẻ'],
    link: '/bang-gia',
    size: 'large',
  },
  {
    id: 'in-mau',
    title: 'In màu Kỹ thuật số',
    description: 'Màu sắc trung thực, phù hợp kỷ yếu, menu, catalogue.',
    icon: '🎨',
    image: 'https://i.pinimg.com/736x/cd/fb/f8/cdfbf80043288c38b56aa57136700b06.jpg',
    features: [
      'Màu sắc chuẩn xác',
      'In nhanh lấy ngay'
    ],
    link: '/bang-gia',
    size: 'large',
  },
  {
    id: 'scan',
    title: 'Scan tài liệu',
    description: 'Số hóa tài liệu 600dpi, OCR và đồng bộ cloud.',
    icon: '📑',
    tags: ['OCR', 'Cloud Sync'],
    image: 'https://i.pinimg.com/736x/a3/5a/99/a35a99117282f02ae1900a66f2dbe444.jpg',
    features: [
      'OCR nhận dạng văn bản',
      'Lưu trữ đám mây'
    ],
    link: '/bang-gia',
    size: 'large',
  },
  {
    id: 'dong-gay',
    title: 'Đóng gáy sách',
    description: 'Đóng keo nhiệt, lò xo, bìa cứng chuyên nghiệp.',
    icon: '📚',
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=300&fit=crop',
    features: [
      'Gáy lò xo chắc chắn',
      'Bìa cứng sang trọng'
    ],
    link: '/bang-gia',
    size: 'large',
  },
  {
    id: 'ep-plastic',
    title: 'Ép plastic',
    description: 'Bảo vệ tài liệu khỏi ẩm mốc và trầy xước.',
    icon: '🪪',
    image: 'https://i.pinimg.com/736x/55/3e/15/553e153bde9ef5bd48213722168d9ad7.jpg',
    features: [
      'Chống nước hiệu quả',
      'Bền đẹp lâu dài'
    ],
    link: '/bang-gia',
    size: 'large',
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: 'Gửi yêu cầu',
    description: 'Gửi file qua Zalo, Email hoặc trực tiếp tại cửa hàng.',
    icon: '📤',
  },
  {
    step: 2,
    title: 'Báo giá & Xác nhận',
    description: 'Nhân viên tư vấn và báo giá chi tiết cho bạn.',
    icon: '💰',
  },
  {
    step: 3,
    title: 'Thực hiện',
    description: 'In ấn theo đúng tiêu chuẩn chất lượng.',
    icon: '🖨️',
  },
  {
    step: 4,
    title: 'Kiểm tra & Giao',
    description: 'Kiểm tra chất lượng và giao hàng tận nơi.',
    icon: '✅',
  },
];
