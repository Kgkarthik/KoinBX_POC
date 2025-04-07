import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrdersAndBalances implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          { name: 'id', type: 'serial', isPrimary: true },
          { name: 'user_id', type: 'integer' },
          { name: 'order_type', type: 'varchar' },
          { name: 'currency_symbol', type: 'varchar' },
          { name: 'price', type: 'decimal' },
          { name: 'quantity', type: 'decimal' },
          { name: 'status', type: 'varchar', default: `'open'` },
          { name: 'created_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'balances',
        columns: [
          { name: 'id', type: 'serial', isPrimary: true },
          { name: 'user_id', type: 'integer' },
          { name: 'currency_symbol', type: 'varchar' },
          { name: 'balance', type: 'decimal' },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders');
    await queryRunner.dropTable('balances');
  }
}
