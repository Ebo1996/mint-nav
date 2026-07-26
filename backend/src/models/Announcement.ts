import mongoose, { Schema, Document } from 'mongoose'

export interface IAnnouncement extends Document {
  id: string
  title: string
  titleAmharic: string
  description: string
  descriptionAmharic: string
  priority: 'info' | 'important' | 'urgent'
  publishDate: Date
  expiryDate?: Date
  isActive: boolean
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

const AnnouncementSchema = new Schema<IAnnouncement>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    titleAmharic: { type: String, required: true },
    description: { type: String, required: true },
    descriptionAmharic: { type: String, required: true },
    priority: { 
      type: String, 
      enum: ['info', 'important', 'urgent'], 
      default: 'info' 
    },
    publishDate: { type: Date, required: true },
    expiryDate: { type: Date },
    isActive: { type: Boolean, default: true },
    createdBy: { type: String, required: true }
  },
  { timestamps: true }
)

export default mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema)
