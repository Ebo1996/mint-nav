import express from 'express'
import Settings from '../models/Settings'
import User from '../models/User'
import { hashPassword, verifyPassword } from '../utils/auth'

const router = express.Router()

// Get settings
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne()
    
    // Create default settings if none exist
    if (!settings) {
      settings = await Settings.create({})
    }
    
    res.json(settings)
  } catch (error) {
    console.error('Error fetching settings:', error)
    res.status(500).json({ error: 'Failed to fetch settings' })
  }
})

// Update settings
router.put('/', async (req, res) => {
  try {
    let settings = await Settings.findOne()
    
    if (!settings) {
      settings = await Settings.create(req.body)
    } else {
      settings = await Settings.findOneAndUpdate(
        {},
        req.body,
        { new: true, runValidators: true }
      )
    }
    
    res.json(settings)
  } catch (error) {
    console.error('Error updating settings:', error)
    res.status(500).json({ error: 'Failed to update settings' })
  }
})

// Change password
router.post('/change-password', async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body

    if (!userId || !currentPassword || !newPassword) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    // Find user
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Verify current password
    const isValid = await verifyPassword(currentPassword, user.password)
    if (!isValid) {
      return res.status(401).json({ error: 'Current password is incorrect' })
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword)
    
    // Update password
    user.password = hashedPassword
    await user.save()

    res.json({ message: 'Password changed successfully' })
  } catch (error) {
    console.error('Error changing password:', error)
    res.status(500).json({ error: 'Failed to change password' })
  }
})

export default router
