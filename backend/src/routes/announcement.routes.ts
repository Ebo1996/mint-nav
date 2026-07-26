import express from 'express'
import Announcement from '../models/Announcement'

const router = express.Router()

// Get all announcements (admin)
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 })
    res.json(announcements)
  } catch (error) {
    console.error('Error fetching announcements:', error)
    res.status(500).json({ error: 'Failed to fetch announcements' })
  }
})

// Get active announcements (public)
router.get('/active', async (req, res) => {
  try {
    const now = new Date()
    const announcements = await Announcement.find({
      isActive: true,
      publishDate: { $lte: now },
      $or: [
        { expiryDate: { $exists: false } },
        { expiryDate: null },
        { expiryDate: { $gte: now } }
      ]
    }).sort({ priority: 1, publishDate: -1 })
    
    res.json(announcements)
  } catch (error) {
    console.error('Error fetching active announcements:', error)
    res.status(500).json({ error: 'Failed to fetch announcements' })
  }
})

// Get single announcement
router.get('/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findOne({ id: req.params.id })
    
    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' })
    }
    
    res.json(announcement)
  } catch (error) {
    console.error('Error fetching announcement:', error)
    res.status(500).json({ error: 'Failed to fetch announcement' })
  }
})

// Create announcement
router.post('/', async (req, res) => {
  try {
    const announcement = await Announcement.create(req.body)
    res.status(201).json(announcement)
  } catch (error) {
    console.error('Error creating announcement:', error)
    res.status(500).json({ error: 'Failed to create announcement' })
  }
})

// Update announcement
router.put('/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' })
    }
    
    res.json(announcement)
  } catch (error) {
    console.error('Error updating announcement:', error)
    res.status(500).json({ error: 'Failed to update announcement' })
  }
})

// Delete announcement
router.delete('/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findOneAndDelete({ id: req.params.id })
    
    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' })
    }
    
    res.json({ message: 'Announcement deleted successfully' })
  } catch (error) {
    console.error('Error deleting announcement:', error)
    res.status(500).json({ error: 'Failed to delete announcement' })
  }
})

export default router
