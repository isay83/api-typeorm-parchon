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

import dotenv from "dotenv"

dotenv.config()

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: 3306,
    database: process.env.DB_NAME,
    entities: [Department, City, User, Role, Place, Event, Category, Ticket, Tier, TicketUser, UserEvent],
    logging: true,
    synchronize: false
})
