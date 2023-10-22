import { Router } from 'express'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { registerProduct } from '../schemas/product.schema.js'
import { newProduct, getProductsGuest, getProductsSeller } from '../controllers/product.controller.js'
import { authRequired } from '../middlewares/validateToken.js'
const router = Router()

router.post('/newProduct', authRequired, validateSchema(registerProduct), newProduct)
router.get('/sellerProducts', authRequired, getProductsSeller)
router.get('/guestProducts', getProductsGuest)

export default router
