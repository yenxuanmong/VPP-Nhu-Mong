import 'dotenv/config';
import app from './app.js';
import prisma from './lib/prisma.js';

const PORT = process.env.PORT || 3001;

async function main() {
  // Test DB connection with timeout
  console.log('Attempting to connect to the database...');
  try {
    await Promise.race([
      prisma.$connect(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('DB connection timeout after 10s')), 10000)
      ),
    ]);
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

main();
