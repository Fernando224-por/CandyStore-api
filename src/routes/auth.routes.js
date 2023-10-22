import { Router } from 'express'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { loginSchema, registerUser } from '../schemas/user.schema.js'
import { Login, Logout, newUser, profile, verifyToken } from '../controllers/user.controller.js'
import { authRequired } from '../middlewares/validateToken.js'
const router = Router()

router.post('/newUser', validateSchema(registerUser), newUser)
router.post('/login', validateSchema(loginSchema), Login)
router.get('/profile/:id', authRequired, profile)
router.post('/logout', Logout)
router.get('/checkAuth', verifyToken)
export default router
