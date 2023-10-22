import mongoose from 'mongoose'
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Gomitas', 'Galletas', 'Turrones', 'Dulces de leche', 'otros'],
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.model('Product', ProductSchema)
