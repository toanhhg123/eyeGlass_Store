import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import env from '../config/env'
import HttpException from '../exceptions/HttpException'
import { UserLogin, successResponse } from '../types'
import User from '../user/user.model'

export const login = async (req: Request<unknown, unknown, UserLogin>, res: Response) => {
  const { user_name, password } = req.body
  const user = await User.findOne({ user_name: user_name })

  if (!user) throw new HttpException(400, 'tên đăng nhập không chính xác')

  if (!(await user.comparePassword(password))) throw new HttpException(400, 'Mật khẩu không chính xác')

  const { _id, email, role } = user
  const token = jwt.sign({ _id, user_name, email, role }, env.jwtKey!)

  return res.json(
    successResponse({
      token,
      user
    })
  )
}

export const register = async (req: Request<unknown, unknown, UserLogin & { email: string }>, res: Response) => {
  const { user_name, password, email } = req.body

  const isExist = await User.findOne({ $or: [{ email }, { user_name }] })

  if (isExist) throw new HttpException(400, 'tên người dùng hoặc email đã tồn tại')

  const user = new User({ user_name, password, email, role: 'user' })

  await user.save()

  const { _id, role } = user

  const token = jwt.sign({ _id, user_name, email, role }, env.jwtKey!)

  return res.json(
    successResponse({
      token,
      user
    })
  )
}
