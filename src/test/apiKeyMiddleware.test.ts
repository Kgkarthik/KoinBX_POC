import request from 'supertest';
import express from 'express';
import { validateApiKey } from '../middleware/apiKeyMiddleware';
import { Request, Response } from 'express';

const app = express();
app.use(validateApiKey);
app.get('/test', (req: Request, res: Response) => {
    res.status(200).send('OK');
  });

describe('API Key Middleware', () => {
  it('should reject request with no API key', async () => {
    const res = await request(app).get('/test');
    expect(res.statusCode).toBe(403);
  });

  it('should reject request with invalid API key', async () => {
    const res = await request(app)
      .get('/test')
      .set('x-api-key', 'invalid-key');
    expect(res.statusCode).toBe(403);
  });

  it('should allow request with valid API key', async () => {
    process.env.API_KEY = 'test-key';
    const res = await request(app)
      .get('/test')
      .set('x-api-key', 'test-key');
    expect(res.statusCode).toBe(200);
  });
});
