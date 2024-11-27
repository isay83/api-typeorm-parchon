import { DataSource } from "typeorm"

import { Department } from "./entities/Department"
import { City } from "./entities/City"
import { User } from "./entities/User"
import { Role } from "./entities/Role"
import { Place } from "./entities/Place"
import { Event } from "./entities/Event"
import { Category } from "./entities/Category"
import { Ticket } from "./entities/Ticket"
import { Tier } from "./entities/Tier"
import { TicketUser } from "./entities/TicketUser"
import { UserEvent } from "./entities/UserEvent"
import { Image } from "./entities/Image"

import { DB_HOST, DB_USER, DB_PASS, DB_PORT, DB_NAME } from "./config"

import dotenv from "dotenv"

dotenv.config()

export const AppDataSource = new DataSource({
    type: "mysql",
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASS,
    port: DB_PORT,
    database: DB_NAME,
    entities: [Department, City, User, Role, Place, Event, Category, Ticket, Tier, TicketUser, UserEvent, Image],
    logging: ['error', 'warn'],
    synchronize: false
})
