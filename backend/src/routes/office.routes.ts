import express from 'express'
import Office from '../models/Office'
import Department from '../models/Department'

const router = express.Router()

// Get all offices with their departments (hierarchical view) - MUST BE BEFORE /:id
router.get('/hierarchy', async (req, res) => {
  try {
    const { buildingRef } = req.query
    const query = buildingRef ? { buildingRef } : {}
    
    const offices = await Office.find(query).sort({ createdAt: -1 }).lean()
    
    // Fetch departments for each office
    const officesWithDepartments = await Promise.all(
      offices.map(async (office) => {
        const departments = await Department.find({ officeRef: office.id }).lean()
        return {
          ...office,
          departments
        }
      })
    )
    
    res.json(officesWithDepartments)
  } catch (error) {
    console.error('Error fetching office hierarchy:', error)
    res.status(500).json({ error: 'Failed to fetch office hierarchy' })
  }
})

// Get all offices
router.get('/', async (req, res) => {
  try {
    const { buildingRef } = req.query
    const query = buildingRef ? { buildingRef } : {}
    
    const offices = await Office.find(query).sort({ createdAt: -1 })
    res.json(offices)
  } catch (error) {
    console.error('Error fetching offices:', error)
    res.status(500).json({ error: 'Failed to fetch offices' })
  }
})

// Get single office
router.get('/:id', async (req, res) => {
  try {
    const office = await Office.findOne({ id: req.params.id })
    
    if (!office) {
      return res.status(404).json({ error: 'Office not found' })
    }
    
    res.json(office)
  } catch (error) {
    console.error('Error fetching office:', error)
    res.status(500).json({ error: 'Failed to fetch office' })
  }
})

// Create office
router.post('/', async (req, res) => {
  try {
    const office = await Office.create(req.body)
    res.status(201).json(office)
  } catch (error) {
    console.error('Error creating office:', error)
    res.status(500).json({ error: 'Failed to create office' })
  }
})

// Update office
router.put('/:id', async (req, res) => {
  try {
    const office = await Office.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!office) {
      return res.status(404).json({ error: 'Office not found' })
    }
    
    res.json(office)
  } catch (error) {
    console.error('Error updating office:', error)
    res.status(500).json({ error: 'Failed to update office' })
  }
})

// Delete office
router.delete('/:id', async (req, res) => {
  try {
    const office = await Office.findOneAndDelete({ id: req.params.id })
    
    if (!office) {
      return res.status(404).json({ error: 'Office not found' })
    }
    
    res.json({ message: 'Office deleted successfully' })
  } catch (error) {
    console.error('Error deleting office:', error)
    res.status(500).json({ error: 'Failed to delete office' })
  }
})

export default router
