import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from '../config/database'
import Building from '../models/Building'
import Office from '../models/Office'
import Department from '../models/Department'
import User from '../models/User'

dotenv.config()

async function exportData() {
  try {
    console.log('🔌 Connecting to MongoDB...')
    await connectDB()
    console.log('✅ Connected to MongoDB\n')

    // Fetch all data
    console.log('📦 Fetching data from database...')
    const buildings = await Building.find().lean()
    const offices = await Office.find().lean()
    const departments = await Department.find().lean()
    const users = await User.find().select('-password').lean() // Exclude passwords

    console.log(`✅ Found ${buildings.length} buildings`)
    console.log(`✅ Found ${offices.length} offices`)
    console.log(`✅ Found ${departments.length} departments`)
    console.log(`✅ Found ${users.length} users\n`)

    // Create export directory
    const exportDir = path.join(__dirname, '../../exports')
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true })
    }

    // Create timestamp for filename
    const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0]
    const exportFile = path.join(exportDir, `ministry-data-${timestamp}.json`)

    // Prepare export data
    const exportData = {
      exportedAt: new Date().toISOString(),
      database: 'ministry-admin',
      collections: {
        buildings: {
          count: buildings.length,
          data: buildings
        },
        offices: {
          count: offices.length,
          data: offices
        },
        departments: {
          count: departments.length,
          data: departments
        },
        users: {
          count: users.length,
          data: users
        }
      },
      summary: {
        totalBuildings: buildings.length,
        totalOffices: offices.length,
        totalDepartments: departments.length,
        totalUsers: users.length
      }
    }

    // Write to file
    fs.writeFileSync(exportFile, JSON.stringify(exportData, null, 2), 'utf-8')

    console.log('✅ Data exported successfully!')
    console.log(`📁 Export file: ${exportFile}`)
    console.log(`📊 File size: ${(fs.statSync(exportFile).size / 1024).toFixed(2)} KB\n`)

    // Also create a compact version (minified)
    const compactFile = path.join(exportDir, `ministry-data-${timestamp}.min.json`)
    fs.writeFileSync(compactFile, JSON.stringify(exportData), 'utf-8')
    console.log(`📁 Compact file: ${compactFile}`)
    console.log(`📊 File size: ${(fs.statSync(compactFile).size / 1024).toFixed(2)} KB\n`)

    // Create a summary report
    const summaryFile = path.join(exportDir, `export-summary-${timestamp}.txt`)
    const summaryReport = `
Ministry Data Export Summary
============================
Export Date: ${new Date().toLocaleString()}
Database: ministry-admin

Data Summary:
-------------
Buildings:   ${buildings.length}
Offices:     ${offices.length}
Departments: ${departments.length}
Users:       ${users.length}

Buildings List:
---------------
${buildings.map((b, i) => `${i + 1}. ${b.name} (${b.shortName}) - ${b.id}`).join('\n')}

Offices List:
-------------
${offices.map((o, i) => `${i + 1}. ${o.name} - ${o.id} (Building: ${o.buildingRef})`).join('\n')}

Export Files:
-------------
1. Full JSON: ministry-data-${timestamp}.json
2. Compact JSON: ministry-data-${timestamp}.min.json
3. Summary: export-summary-${timestamp}.txt

Notes:
------
- User passwords are excluded from the export for security
- All data includes MongoDB metadata (_id, createdAt, updatedAt)
- Data can be imported back using the import-data script
`

    fs.writeFileSync(summaryFile, summaryReport, 'utf-8')
    console.log(`📄 Summary report: ${summaryFile}\n`)

    console.log('✅ Export complete!')
    console.log(`\n📂 All files saved to: ${exportDir}`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Export failed:', error)
    process.exit(1)
  }
}

exportData()
