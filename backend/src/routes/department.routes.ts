import express from 'express'
import Department from '../models/Department'

const router = express.Router()

// Get all departments
router.get('/', async (req, res) => {
  try {
    const { officeRef, buildingRef } = req.query
    
    const query: any = {}
    if (officeRef) query.officeRef = officeRef
    if (buildingRef) query.buildingRef = buildingRef
    
    const departments = await Department.find(query).sort({ createdAt: -1 })
    res.json(departments)
  } catch (error) {
    console.error('Error fetching departments:', error)
    res.status(500).json({ error: 'Failed to fetch departments' })
  }
})

// Get single department
router.get('/:id', async (req, res) => {
  try {
    const department = await Department.findOne({ id: req.params.id })
    
    if (!department) {
      return res.status(404).json({ error: 'Department not found' })
    }
    
    res.json(department)
  } catch (error) {
    console.error('Error fetching department:', error)
    res.status(500).json({ error: 'Failed to fetch department' })
  }
})

// Create department
router.post('/', async (req, res) => {
  try {
    const department = await Department.create(req.body)
    res.status(201).json(department)
  } catch (error) {
    console.error('Error creating department:', error)
    res.status(500).json({ error: 'Failed to create department' })
  }
})

// Update department
router.put('/:id', async (req, res) => {
  try {
    const department = await Department.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!department) {
      return res.status(404).json({ error: 'Department not found' })
    }
    
    res.json(department)
  } catch (error) {
    console.error('Error updating department:', error)
    res.status(500).json({ error: 'Failed to update department' })
  }
})

// Delete department
router.delete('/:id', async (req, res) => {
  try {
    const department = await Department.findOneAndDelete({ id: req.params.id })
    
    if (!department) {
      return res.status(404).json({ error: 'Department not found' })
    }
    
    res.json({ message: 'Department deleted successfully' })
  } catch (error) {
    console.error('Error deleting department:', error)
    res.status(500).json({ error: 'Failed to delete department' })
  }
})

export default router
