import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate, requireAdmin, type AuthRequest } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const where = status
      ? { status: String(status).toUpperCase() as 'PENDING' | 'APPROVED' | 'REJECTED' }
      : { status: 'APPROVED' as const };

    const reviews = await prisma.review.findMany({
      where,
      include: {
        product: { select: { id: true, name: true } },
        user: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(reviews);
  } catch {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

router.get('/admin', authenticate, requireAdmin, async (_req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        product: { select: { id: true, name: true } },
        user: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(reviews);
  } catch {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

router.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const { text, rating, productId } = req.body;

    if (!text || !rating) {
      res.status(400).json({ error: 'Vui lòng điền nội dung và đánh giá' });
      return;
    }

    if (rating < 1 || rating > 5) {
      res.status(400).json({ error: 'Đánh giá phải từ 1 đến 5 sao' });
      return;
    }

    const user = await prisma.user.findUnique({ where: { id: req.user!.userId } });
    if (!user) {
      res.status(404).json({ error: 'Không tìm thấy người dùng' });
      return;
    }

    const avatar = user.name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const review = await prisma.review.create({
      data: {
        userId: user.id,
        productId: productId || null,
        name: user.name,
        role: user.role === 'ADMIN' ? 'Quản trị viên' : 'Khách hàng',
        text,
        rating: Number(rating),
        avatar,
        status: 'PENDING',
      },
    });

    res.status(201).json(review);
  } catch {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

router.patch('/:id/status', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const id = String(req.params.id);
    const { status } = req.body;

    if (!['APPROVED', 'REJECTED', 'PENDING'].includes(status)) {
      res.status(400).json({ error: 'Trạng thái không hợp lệ' });
      return;
    }

    const review = await prisma.review.update({
      where: { id },
      data: { status },
    });

    res.json(review);
  } catch {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

router.delete('/:id', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const id = String(req.params.id);
    await prisma.review.delete({ where: { id } });
    res.json({ message: 'Đã xóa đánh giá' });
  } catch {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

export default router;
