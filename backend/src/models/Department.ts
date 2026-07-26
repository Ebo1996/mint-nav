import mongoose, { Schema, Document } from 'mongoose'

export interface IDepartmentDetail {
  managerName: string
  managerNameAmharic?: string
  position: string
  positionAmharic: string
  photo: string
  description: string
  descriptionAmharic: string
  building: string
  floor: string
  room: string
  officeNumber: string
  telephone: string
  extension: string
  email: string
  location: string
  locationAmharic: string
  status: 'Open' | 'Closed' | 'By Appointment'
}

export interface IDepartment extends Document {
  id: string
  name: string
  amharic?: string
  detail: IDepartmentDetail
  officeRef: string
  buildingRef: string
  createdAt: Date
  updatedAt: Date
}

const DepartmentDetailSchema = new Schema<IDepartmentDetail>(
  {
    managerName: { type: String, required: true },
    managerNameAmharic: { type: String },
    position: { type: String, required: true },
    positionAmharic: { type: String, required: true },
    photo: { type: String, required: true },
    description: { type: String, required: true },
    descriptionAmharic: { type: String, required: true },
    building: { type: String, required: true },
    floor: { type: String, required: true },
    room: { type: String, required: true },
    officeNumber: { type: String, required: true },
    telephone: { type: String, required: true },
    extension: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    locationAmharic: { type: String, required: true },
    status: {
      type: String,
      enum: ['Open', 'Closed', 'By Appointment'],
      default: 'Open',
    },
  },
  { _id: false }
)

const DepartmentSchema = new Schema<IDepartment>(
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
    },
    detail: {
      type: DepartmentDetailSchema,
      required: true,
    },
    officeRef: {
      type: String,
      required: true,
      ref: 'Office',
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

export default mongoose.model<IDepartment>('Department', DepartmentSchema)
