import { Router } from 'express'
import User from '../user/user.model'
import bcrypt from 'bcrypt'

const router = Router()

router.get('/', async (req, res) => {
  await User.deleteMany()

  const users = await User.insertMany([
    {
      user_name: 'admin',
      password: await bcrypt.hash('admin', 10),
      role: 'admin',
      address: '',
      email: 'admin@gmail.com'
    },
    {
      user_name: 'user',
      password: await bcrypt.hash('user', 10),
      role: 'user',
      address: 'BaDinh - Thon Lan - HaNoi - Viet Nam',
      email: 'user@gmail.com'
    }
  ])

  return res.json({ users })
})

export default router
