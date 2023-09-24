import express from 'express'
import { changePassword, changePasswordUser, create, getAll, remove, update, updateProfile } from './user.controller'
import { authMiddleware, isAdmin } from '~/middleware/auth.middleware'
import 'express-async-errors'

const router = express.Router()

router.get('/', getAll)

router.use([authMiddleware])

router.patch('/changePassword', changePassword)
router.patch('/updateProfile', updateProfile)

router.use([isAdmin])

router.patch('/changePasswordUser/:id', changePasswordUser)

router.post('/', create)
router.patch('/:id', update)
router.delete('/:id', remove)

export default router
