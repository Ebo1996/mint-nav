import mongoose, { Schema, Document } from 'mongoose'

export interface IBuilding extends Document {
  id: string
  name: string
  shortName: string
  illustration: string
  description: string
  createdAt: Date
  updatedAt: Date
}

const BuildingSchema = new Schema<IBuilding>(
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
    shortName: {
      type: String,
      required: true,
    },
    illustration: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<IBuilding>('Building', BuildingSchema)
