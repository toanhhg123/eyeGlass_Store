import mongoose, { Schema, Document } from 'mongoose'

// Define the User schema
export interface ProductDocument extends Document {
  name: string
  desc?: string
  price: number
  rate: number
  colors: string[]
  brand: typeof Schema.ObjectId
  category: typeof Schema.ObjectId
  sizes: string[]
  quantity: number
  status: string
  discount: number
  images: string[]
}

const productSchema = new Schema<ProductDocument>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  desc: {
    type: String,
    default: ''
  },
  price: Number,
  rate: {
    type: Number,
    default: 0
  },
  colors: {
    type: [String]
  },
  status: {
    type: String,
    default: 'default'
  },
  discount: {
    type: Number,
    default: 0
  },
  quantity: {
    type: Number,
    default: 0
  },
  brand: {
    type: Schema.ObjectId,
    ref: 'Brands'
  },
  category: {
    type: Schema.ObjectId,
    ref: 'Categories'
  },
  sizes: {
    type: [String],
    default: []
  },
  images: {
    type: [String],
    default: []
  }
})

const Product = mongoose.model<ProductDocument>('Products', productSchema)

export default Product
