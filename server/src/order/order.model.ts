import mongoose, { Schema, Document } from 'mongoose'

// Define the User schema
export interface OrderDocument extends Document {
  quantity: number
  size: string
  color: string
  product: typeof Schema.ObjectId
  user: typeof Schema.ObjectId
  shipping: typeof Schema.ObjectId
  price: number
  status: 'cart' | 'ordered' | 'cancel'
}

const orderSchema = new Schema<OrderDocument>({
  price: Number,
  status: {
    type: String,
    default: 'cart'
  },
  quantity: {
    type: Number,
    default: 0
  },
  shipping: {
    type: Schema.ObjectId,
    ref: 'Shippings'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'Users'
  },
  product: {
    type: Schema.ObjectId,
    ref: 'Products'
  },
  size: {
    type: String
  },
  color: {
    type: String
  }
})

const Order = mongoose.model<OrderDocument>('Orders', orderSchema)

export default Order
