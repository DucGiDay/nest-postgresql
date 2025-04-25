import { DataSource } from 'typeorm';
import 'dotenv/config';
// import { RefreshToken } from './auth/entities/auth.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env?.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT, 10) : 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: false,
  // entities: [RefreshToken], // hoặc đường dẫn entity như 'dist/**/*.entity.js'
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
});