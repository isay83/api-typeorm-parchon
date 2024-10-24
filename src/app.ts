import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import departmentRoutes from './routes/department.routes'
import cityRoutes from './routes/city.routes'
import userRoutes from './routes/user.routes'
import roleRoutes from './routes/role.routes'
import placeRoutes from './routes/place.routes'
import eventRoutes from './routes/event.routes'
import categoryRoutes from './routes/category.routes'

const app = express()

app.use(morgan('dev'))
app.use(cors({
    origin: 'http://localhost:3000', // Frontend local domain
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use(departmentRoutes)
app.use(cityRoutes)
app.use(userRoutes)
app.use(roleRoutes)
app.use(placeRoutes)
app.use(eventRoutes)
app.use(categoryRoutes)

export default app