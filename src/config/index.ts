import dotenv from 'dotenv';

dotenv.config();

export const API_PORT = process.env.API_PORT ? parseInt(process.env.API_PORT) : 4000;

export const DB_TYPE = process.env.DB_HOST || "mysql";
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_USER = process.env.DB_USER || 'USER';
export const DB_PASS = process.env.DB_PASS || 'PASS';
export const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;
export const DB_NAME = process.env.DB_NAME || 'DB';

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'defaultSecretKey';