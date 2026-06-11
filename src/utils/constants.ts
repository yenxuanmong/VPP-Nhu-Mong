export const STORE = {
  name: 'Văn Phòng Phẩm Như Mộng',
  shortName: 'Như Mộng',
  slogan: 'In Nhanh - Giá Tốt - Phục Vụ Tận Tâm',
  address: '107 Tuyến Số 1, Hoài Đức, Hà Nội',
  phone: '0899442906',
  phoneDisplay: '0899 442 906',
  email: 'nghiemf5@gmail.com',
  hours: {
    weekday: '08:00 - 21:00',
    weekend: '08:00 - 18:00',
  },
} as const;

export const NAV_ITEMS = [
  { label: 'Trang chủ', path: '/' },
  { label: 'Dịch vụ', path: '/dich-vu' },
  { label: 'Sản phẩm', path: '/san-pham' },
  { label: 'Bảng giá', path: '/bang-gia' },
  { label: 'Liên hệ', path: '/lien-he' },
] as const;

export const BRANDS = ['HP', 'Canon', 'Epson', 'Brother', 'Double A', 'Thiên Long'] as const;

export const HERO_SERVICES = [
  { icon: '🖨️', label: 'Máy in màu' },
  { icon: '📄', label: 'Scan' },
  { icon: '📋', label: 'In ấn' },
  { icon: '✏️', label: 'Văn phòng phẩm' },
  { icon: '🚚', label: 'Giao hàng nhanh' },
] as const;
