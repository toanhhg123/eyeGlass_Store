import mongoose, { Schema, Document } from 'mongoose'

// Define the User schema
export interface BrandDocument extends Document {
  name: string
  desc?: string
}

const brandSchema = new Schema<BrandDocument>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  desc: {
    type: String,
    default: ''
  }
})

const Brand = mongoose.model<BrandDocument>('Brands', brandSchema)

export default Brand
