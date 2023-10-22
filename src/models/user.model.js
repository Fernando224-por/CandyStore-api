import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    default: 'Seller'
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
},
{
  timestamps: true
})
export default mongoose.model('User', userSchema)
