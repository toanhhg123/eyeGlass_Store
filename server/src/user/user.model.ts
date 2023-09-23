import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt'

// Define the User schema
export interface UserDocument extends Document {
  user_name: string
  email: string
  password: string
  address?: string
  role: 'admin' | 'user'
  comparePassword: (password: string) => Promise<boolean>
}

const userSchema = new Schema<UserDocument>({
  user_name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
})

userSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  const saltRounds = 10
  const hash = await bcrypt.hash(this.password, saltRounds)
  this.password = hash
  next()
})

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  const match = await bcrypt.compare(password, this.password)
  return match
}

// Create the User model
const User = mongoose.model<UserDocument>('Users', userSchema)

export default User
