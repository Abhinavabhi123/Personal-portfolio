import express from 'express';
import cors from 'cors';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { apiRouter } from './controllers/ContentController.js';
import dotenv from "dotenv"
const PORT = process.env.PORT || 4000;

const app = express();
dotenv.config()

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '5mb' })); // Increased for Base64 images
app.use(express.urlencoded({ limit: '5mb', extended: true }));

app.use('/api', apiRouter);

// graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n✔ Shutting down gracefully...');
  await disconnectDatabase();
  process.exit(0);
});

// start
connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✔ Portfolio API running on http://localhost:${PORT}`);
      console.log(`  Admin login -> user: ${process.env.ADMIN_USER || 'admin'}  pass: ${process.env.ADMIN_PASS || 'admin123'}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });

export default app;
