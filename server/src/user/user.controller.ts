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
  const pageIndex = Number(query.pageIndex) ?? 1
  const limit = 10

  const users = await User.find({
    $or: [
      {
        user_name: { $regex: search, $options: 'i' },
        email: { $regex: search, $options: 'i' }
      }
    ]
  })
    .skip((pageIndex - 1) * limit)
    .limit(limit)

  return res.json(
    successResponse({
      search,
      users,
      pageIndex,
      limit,
      total: await User.count({
        $or: [
          {
            user_name: { $regex: search, $options: 'i' },
            email: { $regex: search, $options: 'i' }
          }
        ]
      })
    })
  )
}

export const update = async (req: Request<{ id: string }, unknown, UserDocument>, res: Response) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body)

  return res.status(200).json(successResponse(user))
}

export const remove = async (req: Request<{ id: string }>, res: Response) => {
  const user = await User.findByIdAndDelete(req.params.id)

  return res.status(200).json(successResponse(user))
}
