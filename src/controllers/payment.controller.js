/* eslint-disable object-shorthand */
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
  const { amount, description, seller } = req.body
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'USD',
      amount: amount * 100,
      description: `pago de ${description}`,
      automatic_payment_methods: { enabled: true }
    })
    return res.status(200).json({
      clientSecret: paymentIntent.client_secret
    })
  } catch (err) {
    return res.status(404).json({
      error: err.message
    })
  }
}
