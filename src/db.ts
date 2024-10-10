import { DataSource } from "typeorm"
import { Department } from "./entities/Department"
import dotenv from "dotenv"

dotenv.config()

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: 3306,
    database: process.env.DB_NAME,
    entities: [Department],
    logging: true,
    synchronize: false
})
