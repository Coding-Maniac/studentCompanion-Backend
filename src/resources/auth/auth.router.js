import { Router } from 'express'
import { SignUp, Login } from './auth.controller'

const router = Router()

router.post('/signup', SignUp)
router.post('/login', Login)

export default router