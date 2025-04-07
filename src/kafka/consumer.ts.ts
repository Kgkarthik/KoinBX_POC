// src/kafka/consumer.ts
import { Kafka } from 'kafkajs';
import { AppDataSource } from '../config/db';
import { Balance } from '../entities/Balance';
import { Order } from '../entities/Order';
import { log } from 'console';
import { OrderStatus, OrderType } from '../types';

const kafka = new Kafka({
  clientId: 'crypto-orders-consumer',
  brokers: [process.env.KAFKA_BROKER as string],
});
const consumer = kafka.consumer({ groupId: 'order-group' });

export const processOrder = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: process.env.KAFKA_TOPIC as string, fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return;
      const orderData = JSON.parse(message.value.toString());

      const { user_id, order_type, currency_symbol, price, quantity, id } = orderData;

      const repo = AppDataSource.getRepository(Balance);

      const orderRepo = AppDataSource.getRepository(Order);

      const balance = await repo.findOneBy({ user_id, currency_symbol });

      const order = await orderRepo.findOneBy({ id: id });
      if (!order) {
        console.error("Invalid Order Id", id);
        return;
      }
      let updatedBalance;

      if (order_type === OrderType.BUY) {
        if (!balance) {
          console.warn(`Invalid Balance for user ${user_id}`);
          order.status = OrderStatus.CANCELLED;
          order.updated_at = new Date();
          await orderRepo.save(order);
          return;
        }
        balance.balance = Number(balance.balance) + Number(quantity);
        order.status = OrderStatus.CLOSED;
        order.updated_at = new Date();
        await orderRepo.save(order);
        updatedBalance = await repo.save(balance);
      }
      else if (order_type === OrderType.SELL) {
        if (!balance || Number(balance.balance) < Number(quantity)) {
          console.warn(`Insufficient asset balance for user ${user_id}`);
          order.status = OrderStatus.CANCELLED;
          order.updated_at = new Date();
          await orderRepo.save(order);
          return;
        }
        balance.balance = Number(balance.balance) - Number(quantity);
        order.status = OrderStatus.CLOSED;
        order.updated_at = new Date();
        await orderRepo.save(order);
        updatedBalance = await repo.save(balance);
      }

      console.log(`Updated balance for user ${user_id}:`, updatedBalance);
    },
  });
};
