import paymentModel from "../models/payment.model.js";
import Stripe from 'stripe'
import { STRIPE_SECRET_KEY } from '../config.js'
const stripe = new Stripe(STRIPE_SECRET_KEY)

export const loginPayment = async (req, res) => {
  const customer = await stripe.customers.create({
    email: req.body.email
  })
  if (customer) {
    return res.status(200).json({
      data: customer.id
    })
  } else {
    return res.status(500).json({
      message: 'customer is not created'
    })
  }
}

export const newPayment = async (req, res) => {
  const { amount, description, customerId, seller } = req.body
  try {
    console.log(amount)
    console.log(description)
    console.log(customerId)
    console.log(seller)
    return res.status(200).json({
      message: 'Success data'
    })
  } catch (error) {
    console.error(error)
  }
}
