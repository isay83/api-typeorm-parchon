import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import categoryRoutes from './routes/category.routes'
import cityRoutes from './routes/city.routes'
import departmentRoutes from './routes/department.routes'
import eventRoutes from './routes/event.routes'
import placeRoutes from './routes/place.routes'
import roleRoutes from './routes/role.routes'
import ticketRoutes from './routes/ticket.routes'
import ticketUserRoutes from './routes/ticketUser.routes'
import tierRoutes from './routes/tier.routes'
import userRoutes from './routes/user.routes'
import userEvent from './routes/userEvent.routes'

import { FRONT_URL } from './config'

const app = express()

const corsOptions = {
    origin: `${FRONT_URL}`, // Frontend local domain
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
};

app.use(morgan('dev'))

app.use(cors(corsOptions))
app.options('*', cors(corsOptions)); // Asegura que todas las solicitudes OPTIONS tengan las cabeceras correctas

app.use(express.json())
app.use(cookieParser())

app.use(categoryRoutes)
app.use(cityRoutes)
app.use(departmentRoutes)
app.use(eventRoutes)
app.use(placeRoutes)
app.use(roleRoutes)
app.use(ticketRoutes)
app.use(ticketUserRoutes)
app.use(tierRoutes)
app.use(userRoutes)
app.use(userEvent)

export default app