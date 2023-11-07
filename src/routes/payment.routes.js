import { Router } from 'express'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { registerPayment } from '../schemas/payment.schema.js'
import { newPayment, loginPayment, keyPayment } from '../controllers/payment.controller.js'

const router = Router()

router.post('/loginPayment', loginPayment)
router.post('/payment', validateSchema(registerPayment), newPayment)
router.get('/payment', keyPayment)

export default router
