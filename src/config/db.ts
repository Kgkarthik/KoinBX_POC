import "reflect-metadata";
import { Order } from "../entities/Order"; 
import { Balance } from "../entities/Balance"; 
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();
process.env.API_KEY
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  uuidExtension: "pgcrypto",
  name: "KoinBX_POC",
  entities: [Order,Balance],
});

export const connectDB = async () => {
  try {
    //console.log(AppDataSource)
    await AppDataSource.initialize();
    console.log('Connected to PostgreSQL using TypeORM');
  } catch (err) {
    console.error('TypeORM connection error:', err);
    process.exit(1);
  }
};
