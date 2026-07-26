import express from 'express'
import { buildings } from '../data/ministry-data'

const router = express.Router()

// Get all buildings with offices and departments (public view)
router.get('/buildings', (req, res) => {
  try {
    res.json(buildings)
  } catch (error) {
    console.error('Error fetching public buildings:', error)
    res.status(500).json({ error: 'Failed to fetch buildings' })
  }
})

// Get single building with all details
router.get('/buildings/:id', (req, res) => {
  try {
    const building = buildings.find(b => b.id === req.params.id)
    
    if (!building) {
      return res.status(404).json({ error: 'Building not found' })
    }
    
    res.json(building)
  } catch (error) {
    console.error('Error fetching building:', error)
    res.status(500).json({ error: 'Failed to fetch building' })
  }
})

// Get offices for a building
router.get('/buildings/:buildingId/offices', (req, res) => {
  try {
    const building = buildings.find(b => b.id === req.params.buildingId)
    
    if (!building) {
      return res.status(404).json({ error: 'Building not found' })
    }
    
    res.json(building.offices)
  } catch (error) {
    console.error('Error fetching offices:', error)
    res.status(500).json({ error: 'Failed to fetch offices' })
  }
})

// Get single office with departments
router.get('/buildings/:buildingId/offices/:officeId', (req, res) => {
  try {
    const building = buildings.find(b => b.id === req.params.buildingId)
    
    if (!building) {
      return res.status(404).json({ error: 'Building not found' })
    }
    
    const office = building.offices.find(o => o.id === req.params.officeId)
    
    if (!office) {
      return res.status(404).json({ error: 'Office not found' })
    }
    
    res.json(office)
  } catch (error) {
    console.error('Error fetching office:', error)
    res.status(500).json({ error: 'Failed to fetch office' })
  }
})

// Get departments for an office
router.get('/buildings/:buildingId/offices/:officeId/departments', (req, res) => {
  try {
    const building = buildings.find(b => b.id === req.params.buildingId)
    
    if (!building) {
      return res.status(404).json({ error: 'Building not found' })
    }
    
    const office = building.offices.find(o => o.id === req.params.officeId)
    
    if (!office) {
      return res.status(404).json({ error: 'Office not found' })
    }
    
    res.json(office.departments)
  } catch (error) {
    console.error('Error fetching departments:', error)
    res.status(500).json({ error: 'Failed to fetch departments' })
  }
})

// Get single department
router.get('/buildings/:buildingId/offices/:officeId/departments/:departmentId', (req, res) => {
  try {
    const building = buildings.find(b => b.id === req.params.buildingId)
    
    if (!building) {
      return res.status(404).json({ error: 'Building not found' })
    }
    
    const office = building.offices.find(o => o.id === req.params.officeId)
    
    if (!office) {
      return res.status(404).json({ error: 'Office not found' })
    }
    
    const department = office.departments.find(d => d.id === req.params.departmentId)
    
    if (!department) {
      return res.status(404).json({ error: 'Department not found' })
    }
    
    res.json(department)
  } catch (error) {
    console.error('Error fetching department:', error)
    res.status(500).json({ error: 'Failed to fetch department' })
  }
})

// Search across all data
router.get('/search', (req, res) => {
  try {
    const query = (req.query.q as string || '').toLowerCase()
    
    if (!query) {
      return res.json([])
    }
    
    const results: any[] = []
    
    buildings.forEach(building => {
      building.offices.forEach(office => {
        // Search in office
        if (
          office.name.toLowerCase().includes(query) ||
          office.amharic?.toLowerCase().includes(query) ||
          office.manager.name.toLowerCase().includes(query)
        ) {
          results.push({
            type: 'office',
            buildingId: building.id,
            buildingName: building.name,
            officeId: office.id,
            officeName: office.name,
            officeAmharic: office.amharic,
            managerName: office.manager.name,
          })
        }
        
        // Search in departments
        office.departments.forEach(dept => {
          if (
            dept.name.toLowerCase().includes(query) ||
            dept.amharic?.toLowerCase().includes(query) ||
            dept.detail.managerName.toLowerCase().includes(query)
          ) {
            results.push({
              type: 'department',
              buildingId: building.id,
              buildingName: building.name,
              officeId: office.id,
              officeName: office.name,
              departmentId: dept.id,
              departmentName: dept.name,
              departmentAmharic: dept.amharic,
              managerName: dept.detail.managerName,
            })
          }
        })
      })
    })
    
    res.json(results)
  } catch (error) {
    console.error('Error searching:', error)
    res.status(500).json({ error: 'Search failed' })
  }
})

export default router
