import mongoose, { Schema, Document } from 'mongoose'

// Define the User schema
export interface BlogDocument extends Document {
  title: string
  subtitle: string
  content: string
  image: string
}

const blogSchema = new Schema<BlogDocument>({
  title: {
    type: String,
    required: true,
    unique: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  }
})

const Blog = mongoose.model<BlogDocument>('Blogs', blogSchema)

export default Blog
