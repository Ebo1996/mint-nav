import express from 'express'
import Building from '../models/Building'

const router = express.Router()

// Get all buildings
router.get('/', async (req, res) => {
  try {
    const buildings = await Building.find().sort({ createdAt: -1 })
    res.json(buildings)
  } catch (error) {
    console.error('Error fetching buildings:', error)
    res.status(500).json({ error: 'Failed to fetch buildings' })
  }
})

// Get single building
router.get('/:id', async (req, res) => {
  try {
    const building = await Building.findOne({ id: req.params.id })
    
    if (!building) {
      return res.status(404).json({ error: 'Building not found' })
    }
    
    res.json(building)
  } catch (error) {
    console.error('Error fetching building:', error)
    res.status(500).json({ error: 'Failed to fetch building' })
  }
})

// Create building
router.post('/', async (req, res) => {
  try {
    const building = await Building.create(req.body)
    res.status(201).json(building)
  } catch (error) {
    console.error('Error creating building:', error)
    res.status(500).json({ error: 'Failed to create building' })
  }
})

// Update building
router.put('/:id', async (req, res) => {
  try {
    const building = await Building.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!building) {
      return res.status(404).json({ error: 'Building not found' })
    }
    
    res.json(building)
  } catch (error) {
    console.error('Error updating building:', error)
    res.status(500).json({ error: 'Failed to update building' })
  }
})

// Delete building
router.delete('/:id', async (req, res) => {
  try {
    const building = await Building.findOneAndDelete({ id: req.params.id })
    
    if (!building) {
      return res.status(404).json({ error: 'Building not found' })
    }
    
    res.json({ message: 'Building deleted successfully' })
  } catch (error) {
    console.error('Error deleting building:', error)
    res.status(500).json({ error: 'Failed to delete building' })
  }
})

export default router
