import { Router } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma.js';
import { signToken } from '../lib/jwt.js';
import { authenticate, type AuthRequest } from '../middleware/auth.js';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ error: 'Mật khẩu phải có ít nhất 6 ký tự' });
      return;
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      res.status(409).json({ error: 'Email đã được sử dụng' });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashed, name, role: 'CUSTOMER' },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });

    const token = signToken({ userId: user.id, email: user.email, role: user.role });
    res.status(201).json({ user, token });
  } catch {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Vui lòng nhập email và mật khẩu' });
      return;
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ error: 'Email hoặc mật khẩu không đúng' });
      return;
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      res.status(401).json({ error: 'Email hoặc mật khẩu không đúng' });
      return;
    }

    const token = signToken({ userId: user.id, email: user.email, role: user.role });
    res.json({
      user: { id: user.id, email: user.email, name: user.name, role: user.role, createdAt: user.createdAt },
      token,
    });
  } catch {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

router.get('/me', authenticate, async (req: AuthRequest, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });

    if (!user) {
      res.status(404).json({ error: 'Không tìm thấy người dùng' });
      return;
    }

    res.json({ user });
  } catch {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

export default router;
