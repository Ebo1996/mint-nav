import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/database'

// Import routes
import authRoutes from './routes/auth.routes'
import buildingRoutes from './routes/building.routes'
import officeRoutes from './routes/office.routes'
import departmentRoutes from './routes/department.routes'
import publicRoutes from './routes/public.routes'
import announcementRoutes from './routes/announcement.routes'
import settingsRoutes from './routes/settings.routes'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'MInT Backend API is running' })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/admin/buildings', buildingRoutes)
app.use('/api/admin/offices', officeRoutes)
app.use('/api/admin/departments', departmentRoutes)
app.use('/api/admin/announcements', announcementRoutes)
app.use('/api/admin/settings', settingsRoutes)
app.use('/api/public', publicRoutes) // Public data from ministry-data.ts

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  })
})

// Connect to database and start server
const startServer = async () => {
  try {
    await connectDB()
    
    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on http://localhost:${PORT}`)
      console.log(`📝 API Docs: http://localhost:${PORT}/health`)
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
