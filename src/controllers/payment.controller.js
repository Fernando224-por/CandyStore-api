import PaymentModel from '../models/payment.model.js'
import Stripe from 'stripe'
import { STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY } from '../config.js'
const stripe = new Stripe(STRIPE_SECRET_KEY)

export const keyPayment = (req, res) => {
  res.send({
    publishableKey: STRIPE_PUBLISHABLE_KEY
  })
}

export const loginPayment = async (req, res) => {
  const { nameCustomer, emailCustomer, phoneCustomer } = req.body
  try {
    const customer = await stripe.customers.create({
      email: emailCustomer,
      name: nameCustomer,
      phone: phoneCustomer,
      description: 'Customer'
    })
    if (!customer) {
      return res.status(400).json({
        message: 'customer is not cerated'
      })
    }
    const tokenCustomer = customer.id
    res.cookie('token', tokenCustomer)
    res.json(tokenCustomer)
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }
}

export const newPayment = async (req, res) => {
  const { amount, description } = req.body
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

export const finalPayment = async (req, res) => {
  const { amount, description, customerId, seller } = req.body
  try {
    const payment = new PaymentModel({
      amount,
      description,
      customerId,
      seller
    })
    const savePayment = await payment.save()
    console.log(savePayment)
    res.json(savePayment)
  } catch (err) {
    return res.status(500).json({
      message: 'Bad request, Server response: ', err
    })
  }
}
