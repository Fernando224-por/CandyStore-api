import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes.js'
import productRouter from './routes/product.routes.js'
const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,PATCH,PUT,POST,DELETE',
  preflightContinue: true,
  optionsSuccessStatus: 204,
  credentials: true
}))
app.use(cookieParser())

// rutas de la api
app.use('/api', authRouter)
app.use('/api', productRouter)

// ruta de la api no encontrada
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Route not Found'
  })
})

export default app
