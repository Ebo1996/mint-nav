import dotenv from 'dotenv'
import { buildings } from '../data/ministry-data'
import connectDB from '../config/database'
import Building from '../models/Building'
import Office from '../models/Office'
import Department from '../models/Department'
import User from '../models/User'
import { hashPassword } from '../utils/auth'

dotenv.config()

async function seed() {
  try {
    console.log('🌱 Starting database seed...\n')
    await connectDB()

    // Clear existing data
    console.log('🧹 Clearing existing data...')
    await Building.deleteMany({})
    await Office.deleteMany({})
    await Department.deleteMany({})

    // Seed buildings
    console.log('\n📦 Seeding buildings...')
    for (const building of buildings) {
      await Building.create({
        id: building.id,
        name: building.name,
        shortName: building.shortName,
        illustration: building.illustration,
        description: building.description,
      })
      console.log(`  ✅ Created building: ${building.name}`)

      // Seed offices for this building
      for (const office of building.offices) {
        await Office.create({
          id: office.id,
          name: office.name,
          amharic: office.amharic,
          icon: office.icon,
          work: office.work,
          workAmharic: office.workAmharic,
          manager: office.manager,
          building: office.building,
          floor: office.floor,
          room: office.room,
          officeNumber: office.officeNumber,
          status: office.status,
          buildingRef: building.id,
        })
        console.log(`    ✅ Created office: ${office.name}`)

        // Seed departments for this office
        for (const department of office.departments) {
          await Department.create({
            id: department.id,
            name: department.name,
            amharic: department.amharic,
            detail: department.detail,
            officeRef: office.id,
            buildingRef: building.id,
          })
          console.log(`      ✅ Created department: ${department.name}`)
        }
      }
    }

    // Create default admin user if not exists
    const existingAdmin = await User.findOne({ email: 'admin@mint.gov.et' })
    if (!existingAdmin) {
      const hashedPassword = await hashPassword('admin123')
      await User.create({
        email: 'admin@mint.gov.et',
        password: hashedPassword,
        name: 'Admin User',
        role: 'admin',
      })
      console.log('\n👤 Created default admin user')
      console.log('   📧 Email: admin@mint.gov.et')
      console.log('   🔑 Password: admin123')
      console.log('   ⚠️  CHANGE THIS PASSWORD IN PRODUCTION!')
    } else {
      console.log('\n👤 Admin user already exists')
    }

    console.log('\n✅ Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seed()
