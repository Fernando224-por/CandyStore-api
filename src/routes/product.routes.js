import { Router } from 'express'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { registerProduct } from '../schemas/product.schema.js'
import { newProduct, getProductsGuest, getProductsSeller, deleteProducts, getProduct } from '../controllers/product.controller.js'
import { authRequired } from '../middlewares/validateToken.js'
const router = Router()

router.post('/newProduct', authRequired, validateSchema(registerProduct), newProduct)
router.get('/sellerProducts', authRequired, getProductsSeller)
router.get('/getProduct/:id', authRequired, getProduct)
router.get('/guestProducts', getProductsGuest)
router.delete('/deleteProduct/:id', authRequired, deleteProducts)

export default router
