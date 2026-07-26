import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ministry-admin'

async function checkConnection() {
  console.log('🔍 Checking MongoDB connection...\n')
  console.log(`📍 Connection URI: ${MONGODB_URI}\n`)

  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✅ MongoDB connection successful!')
    console.log(`📊 Database: ${mongoose.connection.db.databaseName}`)
    
    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray()
    console.log(`\n📁 Collections (${collections.length}):`)
    collections.forEach((col) => {
      console.log(`   - ${col.name}`)
    })

    await mongoose.connection.close()
    console.log('\n✅ Connection test completed successfully!')
    process.exit(0)
  } catch (error: any) {
    console.error('❌ MongoDB connection failed!')
    console.error(`\n🔴 Error: ${error.message}\n`)
    
    console.log('💡 Troubleshooting tips:')
    console.log('   1. Make sure MongoDB is running (run "mongod" in terminal)')
    console.log('   2. Check if port 27017 is available')
    console.log('   3. Verify MONGODB_URI in .env file')
    console.log('   4. Or use MongoDB Atlas (cloud) instead\n')
    
    process.exit(1)
  }
}

checkConnection()
