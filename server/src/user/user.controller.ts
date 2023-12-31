import { Request, Response } from 'express'
import User, { UserDocument } from './user.model'
import { successResponse, PageQuery } from '~/types'

export const create = async (req: Request<unknown, unknown, UserDocument>, res: Response) => {
  const newUser = new User(req.body)
  await newUser.save()

  return res.status(201).json(successResponse(newUser))
}

export const getAll = async (req: Request<unknown, unknown, UserDocument>, res: Response) => {
  const query = req.query as PageQuery

  const search = query.search ?? ''
  const pageIndex = Number(query.pageIndex) || 1
  const limit = 12

  const users = User.find({
    $or: [
      {
        user_name: { $regex: search, $options: 'i' },
        email: { $regex: search, $options: 'i' }
      }
    ]
  })
    .skip((pageIndex - 1) * limit)
    .limit(limit)

  const total = User.count({
    $or: [
      {
        user_name: { $regex: search, $options: 'i' },
        email: { $regex: search, $options: 'i' }
      }
    ]
  })

  return res.json(
    successResponse({
      search,
      users: await users,
      pageIndex,
      limit,
      total: await total
    })
  )
}

export const update = async (req: Request<{ id: string }, unknown, UserDocument>, res: Response) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body)

  return res.status(200).json(successResponse(user))
}

export const updateProfile = async (req: Request<unknown, unknown, UserDocument>, res: Response) => {
  const { _id } = req.user

  const user = await User.findByIdAndUpdate(_id, req.body)

  console.log(user)

  return res.status(200).json(successResponse(user))
}

export const changePasswordUser = async (
  req: Request<{ id: string }, unknown, { password: string }>,
  res: Response
) => {
  const user = await User.findById(req.params.id)

  if (!user) throw new Error('not found user')

  user.password = req.body.password

  await user.save()

  return res.status(200).json(successResponse(user))
}

export const changePassword = async (req: Request<unknown, unknown, { password: string }>, res: Response) => {
  const { _id } = req.user

  const user = await User.findById(_id)

  if (!user) throw new Error('not found user')

  user.password = req.body.password

  await user.save()

  return res.json(successResponse(user))
}

export const remove = async (req: Request<{ id: string }>, res: Response) => {
  const user = await User.findByIdAndDelete(req.params.id)

  return res.status(200).json(successResponse(user))
}
