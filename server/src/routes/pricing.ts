import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate, requireAdmin, type AuthRequest } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const where = category && category !== 'all' ? { category: String(category) } : {};

    const rows = await prisma.pricingRow.findMany({
      where,
      orderBy: { sortOrder: 'asc' },
    });

    res.json(rows);
  } catch {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

router.post('/', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { category, format, weight, quantity, price, sortOrder } = req.body;

    if (!format || !weight || !quantity || !price) {
      res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin bảng giá' });
      return;
    }

    const row = await prisma.pricingRow.create({
      data: {
        category: category || 'all',
        format,
        weight,
        quantity,
        price,
        sortOrder: sortOrder ? Number(sortOrder) : 0,
      },
    });

    res.status(201).json(row);
  } catch {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

router.put('/:id', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const existing = await prisma.pricingRow.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      res.status(404).json({ error: 'Không tìm thấy dòng giá' });
      return;
    }

    const { category, format, weight, quantity, price, sortOrder } = req.body;
    const row = await prisma.pricingRow.update({
      where: { id: req.params.id },
      data: {
        ...(category !== undefined && { category }),
        ...(format !== undefined && { format }),
        ...(weight !== undefined && { weight }),
        ...(quantity !== undefined && { quantity }),
        ...(price !== undefined && { price }),
        ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) }),
      },
    });

    res.json(row);
  } catch {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

router.delete('/:id', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const existing = await prisma.pricingRow.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      res.status(404).json({ error: 'Không tìm thấy dòng giá' });
      return;
    }

    await prisma.pricingRow.delete({ where: { id: req.params.id } });
    res.json({ message: 'Đã xóa dòng giá' });
  } catch {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

export default router;
