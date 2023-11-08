import { z } from 'zod'
export const paymentIntent = z.object({
  amount: z.number({
    required_error: 'Price of the payment are required'
  }).min(1, {
    message: 'The minimun value here is 1'
  }),
  description: z.string({
    required_error: 'Description of the payment are required'
  })
})

export const newCustomer = z.object({
  nameCustomer: z.string({
    required_error: 'Name of the Customer are required'
  }),
  emailCustomer: z.string({
    required_error: 'Email of the Customer are required'
  }).email({
    message: 'Invalid Email'
  }),
  phoneCustomer: z.number({
    required_error: 'Phone of the Customer are required'
  })
})

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
    required_error: 'CustomerKey is required'
  }).max(19, {
    message: 'Invalid Customer Id'
  })
})
