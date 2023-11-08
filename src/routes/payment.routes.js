import { Router } from 'express'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { paymentIntent, newCustomer, registerPayment } from '../schemas/payment.schema.js'
import { newPayment, loginPayment, keyPayment, finalPayment } from '../controllers/payment.controller.js'

const router = Router()

router.get('/payment', keyPayment)
router.post('/loginPayment', validateSchema(newCustomer), loginPayment)
router.post('/payment', validateSchema(paymentIntent), newPayment)
router.post('/finalPayment', validateSchema(registerPayment), finalPayment)

export default router
