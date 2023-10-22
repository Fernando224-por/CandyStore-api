import { MONGO_URL } from './config.js'
import mongoose from 'mongoose'
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      autoIndex: true,
      family: 4
    })
    console.log('MongoDB is enabled')
  } catch (error) {
    console.error(error)
  }
}
