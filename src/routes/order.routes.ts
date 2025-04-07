import express from 'express';
import {
  placeOrder,
  getAllOrders,
  getOrderById
} from '../controllers/orderController';

const router = express.Router();

// Create a new order
router.post('/', async (req, res) => {
  await placeOrder(req, res);
});

// Get all orders
router.get('/', async (req, res) => {
  await getAllOrders(req, res);
});

// Get a single order by ID
router.get('/:id', async (req, res) => {
  await getOrderById(req, res);
});

export default router;
