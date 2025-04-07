import "reflect-metadata";
import { Order } from "../entities/Order"; 
import { Balance } from "../entities/Balance"; 
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import path from "path";

dotenv.config();
const baseDir = path.join(__dirname, "..");
console.log(path.join(baseDir, "entity", "*"));

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "postgres",
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
