import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CurrencySymbol, OrderStatus, OrderType } from '../types';

@Entity('orders', { schema: "KoinBx_POC" })
export class Order {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    user_id: string;

    @Column("enum", {
        name: "order_type",
        enum: OrderType,
        nullable: false
    })
    order_type: OrderType;

    @Column("enum", {
        name: "currency_symbol",
        enum: CurrencySymbol,
        nullable: false
    })
    currency_symbol: CurrencySymbol;

    @Column('decimal')
    price: number;

    @Column('decimal')
    quantity: number;

    @Column("enum", {
        name: "status",
        enum: OrderStatus,
        nullable: false,
        default: OrderStatus.OPEN
    })
    status: OrderStatus;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}