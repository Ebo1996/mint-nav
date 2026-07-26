import dotenv from 'dotenv'
import connectDB from '../config/database'
import Settings from '../models/Settings'

dotenv.config()

async function updateSocialLinks() {
  try {
    console.log('🔌 Connecting to MongoDB...')
    await connectDB()
    console.log('✅ Connected to MongoDB\n')

    console.log('📝 Updating social media links...')

    let settings = await Settings.findOne()
    
    if (!settings) {
      console.log('Creating new settings document...')
      settings = await Settings.create({
        facebookUrl: 'https://web.facebook.com/MInT.Ethiopia',
        twitterUrl: 'https://x.com/MinistryofInno2',
        linkedinUrl: '', // Not provided
        youtubeUrl: 'https://www.youtube.com/@MinistryofInnovationandTechnol',
        updatedBy: 'system'
      })
    } else {
      console.log('Updating existing settings document...')
      settings.facebookUrl = 'https://web.facebook.com/MInT.Ethiopia'
      settings.twitterUrl = 'https://x.com/MinistryofInno2'
      settings.youtubeUrl = 'https://www.youtube.com/@MinistryofInnovationandTechnol'
      settings.updatedBy = 'system'
      await settings.save()
    }

    console.log('✅ Social media links updated successfully!\n')
    console.log('📱 Social Media Links:')
    console.log('   Facebook:  ', settings.facebookUrl)
    console.log('   Twitter:   ', settings.twitterUrl)
    console.log('   LinkedIn:  ', settings.linkedinUrl || '(not set)')
    console.log('   YouTube:   ', settings.youtubeUrl)
    console.log('')
    console.log('📝 Note: Telegram link should be added in Settings page')
    console.log('   Telegram: https://t.me/MinTEthiopia')

    process.exit(0)
  } catch (error) {
    console.error('❌ Update failed:', error)
    process.exit(1)
  }
}

updateSocialLinks()
