import { z } from 'zod'
export const registerUser = z.object({
  name: z.string({
    required_error: 'Name is required'
  }),
  phone: z.number({
    required_error: 'Phone number is required'
  }),
  email: z.string({
    required_error: 'Email is required'
  }).email({
    message: 'Invalid Email'
  }),
  password: z.string({
    required_error: 'Password is required'
  }).min(8, {
    message: 'Password must be a least a 8 characters'
  })
})

export const loginSchema = z.object({
  email: z.string({
    required_error: 'Email is required'
  }).email({
    message: 'Invalid Email'
  }),
  password: z.string({
    required_error: 'Password is required'
  }).min(8, {
    message: 'Password must be a least a 6 characters'
  })
})
