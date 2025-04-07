import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CurrencySymbol } from '../types';

@Entity('balances', { schema: "KoinBx_POC" })
export class Balance {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    user_id: string;

    @Column("enum", {
        name: "currency_symbol",
        enum: CurrencySymbol,
        nullable: false
    })
    currency_symbol: CurrencySymbol;

    @Column('decimal')
    balance: number;
}