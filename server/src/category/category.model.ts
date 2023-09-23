import mongoose, { Schema, Document } from 'mongoose'

// Define the User schema
export interface CategoryDocument extends Document {
  name: string
  desc?: string
}

const categorySchema = new Schema<CategoryDocument>({
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

const Category = mongoose.model<CategoryDocument>('Categories', categorySchema)

export default Category
