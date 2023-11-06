import { z } from 'zod'
export const registerPayment = z.object({
  amount: z.number({
    required_error: 'Price of the payment are required'
  }).min(1, {
    message: 'The minimun value here is 1'
  }),
  description: z.string({
    required_error: 'Description of the payment are required'
  }),
  customerId: z.string({
    required_error: 'CustomerId of the payment are required'
  })
})
