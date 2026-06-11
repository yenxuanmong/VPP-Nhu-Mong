import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, requireAdmin, async (_req, res) => {
  try {
    const [totalUsers, totalOrders, revenueResult, productRankings, userRankings, recentOrders] =
      await Promise.all([
        prisma.user.count({ where: { role: 'CUSTOMER' } }),

        prisma.order.count({ where: { status: 'COMPLETED' } }),

        prisma.order.aggregate({
          where: { status: 'COMPLETED' },
          _sum: { totalAmount: true },
        }),

        prisma.orderItem.groupBy({
          by: ['productId'],
          _sum: { quantity: true },
          _count: { id: true },
          orderBy: { _sum: { quantity: 'desc' } },
          take: 10,
        }),

        prisma.order.groupBy({
          by: ['userId'],
          _sum: { totalAmount: true },
          _count: { id: true },
          orderBy: { _sum: { totalAmount: 'desc' } },
          take: 10,
        }),

        prisma.order.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: {
            user: { select: { name: true, email: true } },
            items: { include: { product: { select: { name: true } } } },
          },
        }),
      ]);

    const productIds = productRankings.map((p) => p.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, name: true, image: true, price: true },
    });
    const productMap = Object.fromEntries(products.map((p) => [p.id, p]));

    const userIds = userRankings.map((u) => u.userId);
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, name: true, email: true },
    });
    const userMap = Object.fromEntries(users.map((u) => [u.id, u]));

    const monthlyRevenue = await prisma.$queryRaw<{ month: string; revenue: number }[]>`
      SELECT strftime('%Y-%m', createdAt) as month, SUM(totalAmount) as revenue
      FROM "Order"
      WHERE status = 'COMPLETED'
      GROUP BY strftime('%Y-%m', createdAt)
      ORDER BY month DESC
      LIMIT 6
    `;

    res.json({
      stats: {
        totalUsers,
        totalOrders,
        totalRevenue: revenueResult._sum.totalAmount || 0,
        pendingReviews: await prisma.review.count({ where: { status: 'PENDING' } }),
        totalProducts: await prisma.product.count(),
      },
      productRankings: productRankings.map((p, index) => ({
        rank: index + 1,
        product: productMap[p.productId],
        totalQuantity: p._sum.quantity || 0,
        orderCount: p._count.id,
      })),
      userRankings: userRankings.map((u, index) => ({
        rank: index + 1,
        user: userMap[u.userId],
        totalSpent: u._sum.totalAmount || 0,
        orderCount: u._count.id,
      })),
      monthlyRevenue: monthlyRevenue.reverse(),
      recentOrders,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

export default router;
