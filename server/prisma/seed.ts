import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const products = [
  { name: 'Giấy A4 Double A 80gsm', category: 'Giấy in & Photo', brand: 'Double A', price: 85000, image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=400&fit=crop', badge: 'hot' },
  { name: 'Máy in Canon LBP 6030w', category: 'Máy in & Thiết bị', brand: 'Canon', price: 3290000, image: 'https://images.unsplash.com/photo-1612815154855-874899a39ec3?w=400&h=400&fit=crop', badge: 'sale', salePercent: 10 },
  { name: 'Mực in HP 85A chính hãng', category: 'Mực in chính hãng', brand: 'HP', price: 450000, image: 'https://images.unsplash.com/photo-1612815154855-874899a39ec3?w=400&h=400&fit=crop' },
  { name: 'Bút bi Thiên Long TL-027', category: 'Bút ký & Sổ tay', brand: 'Thiên Long', price: 3500, image: 'https://images.unsplash.com/photo-1583485080605-87bce1a37e8c?w=400&h=400&fit=crop' },
  { name: 'Sổ tay bìa da A5', category: 'Bút ký & Sổ tay', brand: 'Moleskine', price: 45000, image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=400&fit=crop', badge: 'hot' },
  { name: 'File hồ sơ 2 cặp A4', category: 'File hồ sơ & Lưu trữ', brand: 'Plus', price: 8000, image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=400&fit=crop' },
  { name: 'Máy in HP LaserJet Pro', category: 'Máy in & Thiết bị', brand: 'HP', price: 4500000, image: 'https://images.unsplash.com/photo-1612815154855-874899a39ec3?w=400&h=400&fit=crop' },
  { name: 'Combo mực HP 680 (4 màu)', category: 'Mực in chính hãng', brand: 'HP', price: 680000, image: 'https://images.unsplash.com/photo-1612815154855-874899a39ec3?w=400&h=400&fit=crop', badge: 'sale', salePercent: 15 },
  { name: 'Giấy A4 IK Plus 70gsm', category: 'Giấy in & Photo', brand: 'Double A', price: 72000, image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=400&fit=crop' },
  { name: 'Bộ dụng cụ học tập', category: 'Văn phòng phẩm', brand: 'Thiên Long', price: 25000, image: 'https://images.unsplash.com/photo-1583485080605-87bce1a37e8c?w=400&h=400&fit=crop' },
  { name: 'Bút Pentel EnerGel', category: 'Bút ký & Sổ tay', brand: 'Pentel', price: 18000, image: 'https://images.unsplash.com/photo-1583485080605-87bce1a37e8c?w=400&h=400&fit=crop', badge: 'hot' },
  { name: 'Máy in Epson L3250', category: 'Máy in & Thiết bị', brand: 'Epson', price: 5200000, image: 'https://images.unsplash.com/photo-1612815154855-874899a39ec3?w=400&h=400&fit=crop' },
];

const pricingRows = [
  { category: 'photocopy', format: 'A4 (1 mặt)', weight: '80gsm', quantity: '1-100', price: '300đ', sortOrder: 1 },
  { category: 'photocopy', format: 'A4 (2 mặt)', weight: '80gsm', quantity: '1-100', price: '500đ', sortOrder: 2 },
  { category: 'photocopy', format: 'A3', weight: '80gsm', quantity: '1-50', price: '800đ', sortOrder: 3 },
  { category: 'color', format: 'In màu Laser A4', weight: '80gsm', quantity: '1-50', price: '2.000đ', sortOrder: 4 },
  { category: 'binding', format: 'Đóng gáy lò xo', weight: '-', quantity: '1-500 trang', price: '15.000đ', sortOrder: 5 },
  { category: 'binding', format: 'Ép plastic A4', weight: '-', quantity: '1-50', price: '5.000đ', sortOrder: 6 },
];

const testimonials = [
  { name: 'Nguyễn Thành', role: 'Doanh nghiệp', text: 'In cực nhanh, giá tốt. Mình thường xuyên đến đây photocopy tài liệu cho công ty.', rating: 5, avatar: 'NT' },
  { name: 'Lê Hương', role: 'Sinh viên', text: 'Dịch vụ chuyên nghiệp, nhân viên nhiệt tình. Giao hàng đúng hẹn.', rating: 5, avatar: 'LH' },
  { name: 'Vũ Minh', role: 'Văn phòng', text: 'Mực in chính hãng, chất lượng tốt. Giá rẻ hơn nhiều chỗ khác.', rating: 5, avatar: 'VM' },
  { name: 'Trần Bảo Châu', role: 'Giáo viên', text: 'In đề thi số lượng lớn rất nhanh, không bị nhòe mực, giá cả hợp lý.', rating: 5, avatar: 'BC' },
  { name: 'Phạm Quốc Hùng', role: 'Kỹ sư', text: 'Mua mực máy in tại đây chính hãng, bền, giá rẻ hơn mua online.', rating: 5, avatar: 'QH' },
];

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.pricingRow.deleteMany();
  await prisma.user.deleteMany();

  const adminPassword = await bcrypt.hash('admin123', 10);
  const customerPassword = await bcrypt.hash('customer123', 10);

  const admin = await prisma.user.create({
    data: { email: 'admin@nhumong.vn', password: adminPassword, name: 'Quản trị viên', role: 'ADMIN' },
  });

  const customers = await Promise.all([
    prisma.user.create({ data: { email: 'nguyen.thanh@email.com', password: customerPassword, name: 'Nguyễn Thành', role: 'CUSTOMER' } }),
    prisma.user.create({ data: { email: 'le.huong@email.com', password: customerPassword, name: 'Lê Hương', role: 'CUSTOMER' } }),
    prisma.user.create({ data: { email: 'vu.minh@email.com', password: customerPassword, name: 'Vũ Minh', role: 'CUSTOMER' } }),
    prisma.user.create({ data: { email: 'tran.chau@email.com', password: customerPassword, name: 'Trần Bảo Châu', role: 'CUSTOMER' } }),
    prisma.user.create({ data: { email: 'pham.hung@email.com', password: customerPassword, name: 'Phạm Quốc Hùng', role: 'CUSTOMER' } }),
  ]);

  const createdProducts = await Promise.all(
    products.map((p) => prisma.product.create({ data: p }))
  );

  await Promise.all(
    pricingRows.map((row) => prisma.pricingRow.create({ data: row }))
  );

  await Promise.all(
    testimonials.map((t, i) =>
      prisma.review.create({
        data: {
          ...t,
          userId: customers[i % customers.length].id,
          status: 'APPROVED',
        },
      })
    )
  );

  const ordersData = [
    { userId: customers[0].id, items: [{ productIdx: 0, qty: 5 }, { productIdx: 3, qty: 20 }] },
    { userId: customers[0].id, items: [{ productIdx: 1, qty: 1 }, { productIdx: 2, qty: 2 }] },
    { userId: customers[1].id, items: [{ productIdx: 4, qty: 3 }, { productIdx: 9, qty: 10 }] },
    { userId: customers[2].id, items: [{ productIdx: 2, qty: 4 }, { productIdx: 7, qty: 2 }] },
    { userId: customers[3].id, items: [{ productIdx: 0, qty: 10 }, { productIdx: 5, qty: 50 }] },
    { userId: customers[4].id, items: [{ productIdx: 6, qty: 1 }] },
    { userId: customers[1].id, items: [{ productIdx: 10, qty: 15 }, { productIdx: 8, qty: 8 }] },
    { userId: customers[2].id, items: [{ productIdx: 11, qty: 1 }] },
    { userId: customers[3].id, items: [{ productIdx: 1, qty: 2 }, { productIdx: 4, qty: 5 }] },
    { userId: customers[0].id, items: [{ productIdx: 8, qty: 12 }] },
  ];

  for (const orderData of ordersData) {
    const items = orderData.items.map(({ productIdx, qty }) => ({
      productId: createdProducts[productIdx].id,
      quantity: qty,
      price: createdProducts[productIdx].price,
    }));
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await prisma.order.create({
      data: {
        userId: orderData.userId,
        totalAmount,
        status: 'COMPLETED',
        items: { create: items },
      },
    });
  }

  console.log('Seed completed!');
  console.log('Admin: admin@nhumong.vn / admin123');
  console.log('Customer: nguyen.thanh@email.com / customer123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
