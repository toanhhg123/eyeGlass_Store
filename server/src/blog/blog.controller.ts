import { Request, Response } from 'express'
import { successResponse } from '~/types'
import Blog, { BlogDocument } from './blog.model'

export const create = async (req: Request<unknown, unknown, BlogDocument>, res: Response) => {
  const record = new Blog(req.body)
  await record.save()

  return res.status(201).json(successResponse(record))
}

export const getAll = async (req: Request<unknown, unknown, BlogDocument>, res: Response) => {
  const record = await Blog.find()

  return res.json(successResponse(record))
}

export const update = async (req: Request<{ id: string }, unknown, BlogDocument>, res: Response) => {
  const record = await Blog.findByIdAndUpdate(req.params.id, req.body)

  return res.status(200).json(successResponse(record))
}

export const remove = async (req: Request<{ id: string }>, res: Response) => {
  const record = await Blog.findByIdAndDelete(req.params.id)

  return res.status(200).json(successResponse(record))
}
