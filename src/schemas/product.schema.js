import { z } from 'zod'
export const registerProduct = z.object({
  name: z.string({
    required_error: 'Name of Product is Required'
  }),
  region: z.string({
    required_error: 'Region of the Product are required'
  }),
  price: z.number({
    required_error: 'Price of the product are required'
  }),
  category: z.enum(['Gomitas', 'Galletas', 'Turrones', 'Dulces de leche', 'Helados', 'Otros'], {
    required_error: 'Category of the product are required'
  })
})
