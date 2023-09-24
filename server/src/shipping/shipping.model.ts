import mongoose, { Schema, Document } from 'mongoose'

// Define the User schema
export interface shippingDocument extends Document {
  status: string
  desc?: string
}

const shippingSchema = new Schema<shippingDocument>({
  status: {
    type: String
  },
  desc: {
    type: String,
    default: ''
  }
})

const Shipping = mongoose.model<shippingDocument>('Shippings', shippingSchema)

export default Shipping
