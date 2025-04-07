// src/middleware/apiKeyMiddleware.ts
import { Request, Response, NextFunction } from 'express';

export const validateApiKey = (req: Request, res: Response, next: NextFunction): void => {
  const clientKey = req.headers['x-api-key'];
  const serverKey = process.env.API_KEY;

  if (!clientKey || clientKey !== serverKey) {
    res.status(403).json({ error: 'Forbidden: Invalid API Key' });
    return;
  }

  next();
};
