// import paymentModel from "../models/payment.model.js";
import Stripe from 'stripe'
import { STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY } from '../config.js'
const stripe = new Stripe(STRIPE_SECRET_KEY)

export const keyPayment = (req, res) => {
  res.send({
    publishableKey: STRIPE_PUBLISHABLE_KEY
  })
}

export const loginPayment = async (req, res) => {
  const { mail } = req.body
  const customer = await stripe.customers.create({
    email: mail
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
    console.log('Amount: ', amount)
    console.log('Description: ', description)
    console.log('Client: ', customerId)
    console.log('Seller: ', seller)
    return res.status(200).json({
      message: 'Success, check you console'
    })
  } catch (error) {
    console.error(error)
  }
}
