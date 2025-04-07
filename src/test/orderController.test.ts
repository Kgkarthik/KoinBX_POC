import request from 'supertest';
import express from 'express';
import orderRoutes from '../routes/order.routes';
import { validateApiKey } from '../middleware/apiKeyMiddleware';

const app = express();
app.use(express.json());
app.use(validateApiKey);
app.use('/orders', orderRoutes);

process.env.API_KEY = 'test-key';

describe('Order Routes', () => {
  it('should return empty orders list', async () => {
    const res = await request(app)
      .get('/orders')
      .set('x-api-key', 'test-key');
    
    // This assumes your controller returns an array
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
