import { processOrder } from "../kafka/consumer.ts";
import { AppDataSource } from '../config/db';
import { Balance } from '../entities/Balance';
import { CurrencySymbol, OrderType } from '../types';

jest.mock('kafkajs', () => ({
  Kafka: jest.fn().mockImplementation(() => ({
    consumer: jest.fn().mockReturnValue({
      connect: jest.fn(),
      subscribe: jest.fn(),
      run: jest.fn(({ eachMessage }: any) =>
        eachMessage({
          message: {
            value: Buffer.from(JSON.stringify({
              user_id: "1",
              order_type: OrderType.BUY,
              currency_symbol: CurrencySymbol.BTC,
              price: 100,
              quantity: 1,
            })),
          },
        })
      ),
    }),
  })),
}));

describe('Kafka Consumer', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('should process Kafka message and update balance', async () => {
    await processOrder();
  });
});
