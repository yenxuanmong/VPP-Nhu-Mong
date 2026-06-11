import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import pricingRoutes from './routes/pricing.js';
import reviewRoutes from './routes/reviews.js';
import dashboardRoutes from './routes/dashboard.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// In production the frontend is served from this same process,
// so we only need to allow dev origins in development.
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? true // same-origin, allow all (express static handles it)
  : ['http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

// ── API routes ────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/dashboard', dashboardRoutes);

// ── Serve React frontend in production ────────────────────────
if (process.env.NODE_ENV === 'production') {
  // server/dist/src → up 3 levels → repo root → dist/
  // server/dist/src ../../.. = repo root
  const frontendDist = path.resolve(__dirname, '..', '..', '..', 'dist');
  app.use(express.static(frontendDist));

  // All unmatched routes → index.html (client-side routing)
  app.get('*', (_req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

export default app;
