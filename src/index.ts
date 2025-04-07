import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import orderRoutes from './routes/order.routes';
import { connectDB } from './config/db';
import { processOrder } from './kafka/consumer.ts';
import { validateApiKey } from './middleware/apiKeyMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(bodyParser.json());

//validate with API key
app.use(validateApiKey);

// Connect to PostgreSQL
connectDB();

// Routes
app.use('/orders', orderRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('🚀 Crypto Order API is running with PostgreSQL');
});

// Start server
app.listen(PORT, async () => {
  await processOrder();
  console.log(`Server is running on http://localhost:${PORT}`);
});
