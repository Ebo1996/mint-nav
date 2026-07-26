import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ministry-admin'

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✅ MongoDB connected successfully')
    console.log(`📊 Database: ${mongoose.connection.db.databaseName}`)
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    process.exit(1)
  }
}

export default connectDB
