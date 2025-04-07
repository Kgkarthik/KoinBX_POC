// tests/entities.test.ts
import { Order } from '../entities/Order';
import { CurrencySymbol, OrderType } from '../types';

describe('Order Entity', () => {
  it('should create a valid Order object', () => {
    const order = new Order();
    order.user_id = "1";
    order.order_type = OrderType.BUY;
    order.currency_symbol = CurrencySymbol.BTC;
    order.price = 50000;
    order.quantity = 2;

    expect(order.user_id).toBe('1');
    expect(order.order_type).toBe('BUY');
    expect(order.currency_symbol).toBe('BTC');
    expect(order.price).toBe(50000);
    expect(order.quantity).toBe(2);
  });
});
