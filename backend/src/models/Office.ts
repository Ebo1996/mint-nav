import mongoose, { Schema, Document } from 'mongoose'

export interface IManager {
  name: string
  nameAmharic?: string
  position: string
  positionAmharic: string
  photo: string
  telephone: string
  email: string
}

export interface IOffice extends Document {
  id: string
  name: string
  amharic: string
  icon: string
  work: string
  workAmharic: string
  manager: IManager
  building: string
  floor: string
  room: string
  officeNumber: string
  status: 'Open' | 'Closed' | 'By Appointment'
  buildingRef: string
  createdAt: Date
  updatedAt: Date
}

const ManagerSchema = new Schema<IManager>(
  {
    name: { type: String, required: true },
    nameAmharic: { type: String },
    position: { type: String, required: true },
    positionAmharic: { type: String, required: true },
    photo: { type: String, required: true },
    telephone: { type: String, required: true },
    email: { type: String, required: true },
  },
  { _id: false }
)

const OfficeSchema = new Schema<IOffice>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    amharic: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    work: {
      type: String,
      required: true,
    },
    workAmharic: {
      type: String,
      required: true,
    },
    manager: {
      type: ManagerSchema,
      required: true,
    },
    building: {
      type: String,
      required: true,
    },
    floor: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      required: true,
    },
    officeNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Open', 'Closed', 'By Appointment'],
      default: 'Open',
    },
    buildingRef: {
      type: String,
      required: true,
      ref: 'Building',
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<IOffice>('Office', OfficeSchema)
