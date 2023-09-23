import express from 'express'
import { create, getAll, remove, update } from './brand.controller'
import { authMiddleware, isAdmin } from '~/middleware/auth.middleware'
import 'express-async-errors'

const router = express.Router()

router.get('/', getAll)

router.use([authMiddleware, isAdmin])
router.post('/', create)
router.patch('/:id', update)
router.delete('/:id', remove)

export default router
