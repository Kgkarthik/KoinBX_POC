import { Request, Response } from 'express';
import { AppDataSource } from '../config/db';
import { Order } from '../entities/Order';
import { kafkaProducer } from '../kafka/producer';
import { OrderStatus } from '../types';
import { Balance } from '../entities/Balance';

const orderRepo = AppDataSource.getRepository(Order);
const balanceRepo = AppDataSource.getRepository(Balance);

export const placeOrder = async (req: Request, res: Response) => {
  const { user_id, order_type, currency_symbol, price, quantity } = req.body;

  if (!user_id || !order_type || !currency_symbol || !price || !quantity) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const user = await balanceRepo.findOneBy({ user_id, currency_symbol });

  if(!user){
    return res.status(400).json({ error: 'Unknown user Id' });
  }

  try {
    const newOrder = orderRepo.create({
      user_id,
      order_type,
      currency_symbol,
      price,
      quantity,
      status: OrderStatus.OPEN
    });

    const savedOrder = await orderRepo.save(newOrder);
    await kafkaProducer(savedOrder);

    res.status(201).json({ message: 'Order placed', order: savedOrder });
  } catch (err) {
    console.error('Error saving order:', err);
    res.status(500).json({ error: 'Failed to place order' });
  }
};

export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await orderRepo.find();
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const order = await orderRepo.findOneBy({ id: id });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (err) {
    console.error('Error fetching order by ID:', err);
    res.status(500).json({ error: 'Failed to retrieve order' });
  }
};
