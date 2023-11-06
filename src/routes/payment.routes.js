import { Router } from 'express'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { registerPayment } from '../schemas/payment.schema.js'
import { newPayment, loginPayment } from '../controllers/payment.controller.js'

const router = Router()

router.post('/loginPayment', loginPayment)
router.post('/payment', validateSchema(registerPayment), newPayment)

export default router
