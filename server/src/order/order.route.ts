import express from 'express'
import 'express-async-errors'
import { authMiddleware } from '~/middleware/auth.middleware'
import { create, getAll, remove, update, getMyOrder } from './order.controller'

const router = express.Router()

router.get('/', getAll)

router.use([authMiddleware])

router.get('/user', getMyOrder)
router.post('/', create)
router.patch('/:id', update)
router.delete('/:id', remove)

export default router
