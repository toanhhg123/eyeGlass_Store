import env from './env'
import mongoose from 'mongoose'

mongoose.connect(env.urlDb, { dbName: env.dbName })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
  console.log('Connected to MongoDB')
})
