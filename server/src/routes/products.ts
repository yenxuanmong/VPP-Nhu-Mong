import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate, requireAdmin, type AuthRequest } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(products);
  } catch {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = String(req.params.id);
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
      return;
    }
    res.json(product);
  } catch {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

router.post('/', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { name, category, brand, price, image, badge, salePercent } = req.body;

    if (!name || !category || !brand || price == null || !image) {
      res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin sản phẩm' });
      return;
    }

    const product = await prisma.product.create({
      data: {
        name,
        category,
        brand,
        price: Number(price),
        image,
        badge: badge || null,
        salePercent: salePercent ? Number(salePercent) : null,
      },
    });

    res.status(201).json(product);
  } catch {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

router.put('/:id', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const id = String(req.params.id);
    const { name, category, brand, price, image, badge, salePercent } = req.body;

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
      return;
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(category !== undefined && { category }),
        ...(brand !== undefined && { brand }),
        ...(price !== undefined && { price: Number(price) }),
        ...(image !== undefined && { image }),
        ...(badge !== undefined && { badge: badge || null }),
        ...(salePercent !== undefined && { salePercent: salePercent ? Number(salePercent) : null }),
      },
    });

    res.json(product);
  } catch {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

router.delete('/:id', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const id = String(req.params.id);

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
      return;
    }

    await prisma.product.delete({ where: { id } });
    res.json({ message: 'Đã xóa sản phẩm' });
  } catch {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

export default router;
