import express from 'express'
import 'express-async-errors'
import { authMiddleware, isEmployeeOrAdmin } from '~/middleware/auth.middleware'
import { create, findOne, getAll, remove, update } from './product.controller'

const router = express.Router()

router.get('/', getAll)
router.get('/:id', findOne)

router.use([authMiddleware, isEmployeeOrAdmin])

router.post('/', create)
router.patch('/:id', update)
router.delete('/:id', remove)

export default router
