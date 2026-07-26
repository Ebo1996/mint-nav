import express from 'express'
import User from '../models/User'
import { hashPassword, verifyPassword, generateToken } from '../utils/auth'

const router = express.Router()

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, role } = req.body

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const hashedPassword = await hashPassword(password)

    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      role: role || 'viewer',
    })

    const token = generateToken(user._id.toString(), user.email, user.role)

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isValid = await verifyPassword(password, user.password)
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = generateToken(user._id.toString(), user.email, user.role)

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
