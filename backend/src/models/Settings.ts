import mongoose, { Schema, Document } from 'mongoose'

export interface ISettings extends Document {
  ministryName: string
  ministryNameAmharic: string
  contactEmail: string
  contactPhone: string
  address: string
  addressAmharic: string
  workingHours: string
  workingHoursAmharic: string
  facebookUrl?: string
  twitterUrl?: string
  telegramUrl?: string
  linkedinUrl?: string
  youtubeUrl?: string
  maintenanceMode: boolean
  updatedBy: string
  updatedAt: Date
}

const SettingsSchema = new Schema<ISettings>(
  {
    ministryName: { type: String, default: 'Ministry of Innovation and Technology' },
    ministryNameAmharic: { type: String, default: 'የፈጠራና ቴክኖሎጂ ሚኒስቴር' },
    contactEmail: { type: String, default: 'info@mint.gov.et' },
    contactPhone: { type: String, default: '+251 11 552 0000' },
    address: { type: String, default: 'Addis Ababa, Ethiopia' },
    addressAmharic: { type: String, default: 'አዲስ አበባ፣ ኢትዮጵያ' },
    workingHours: { type: String, default: 'Monday - Friday: 8:30 AM - 5:30 PM' },
    workingHoursAmharic: { type: String, default: 'ሰኞ - አርብ: 8:30 ጠዋት - 5:30 ምሽት' },
    facebookUrl: { type: String },
    twitterUrl: { type: String },
    telegramUrl: { type: String },
    linkedinUrl: { type: String },
    youtubeUrl: { type: String },
    maintenanceMode: { type: Boolean, default: false },
    updatedBy: { type: String }
  },
  { timestamps: true }
)

export default mongoose.model<ISettings>('Settings', SettingsSchema)
