import { Request, Response } from 'express'
import { successResponse } from '~/types'
import Category, { CategoryDocument } from './category.model'

export const create = async (req: Request<unknown, unknown, CategoryDocument>, res: Response) => {
  const record = new Category(req.body)
  await record.save()

  return res.status(201).json(successResponse(record))
}

export const getAll = async (req: Request<unknown, unknown, CategoryDocument>, res: Response) => {
  const record = await Category.find()

  return res.json(successResponse(record))
}

export const update = async (req: Request<{ id: string }, unknown, CategoryDocument>, res: Response) => {
  const record = await Category.findByIdAndUpdate(req.params.id, req.body)

  return res.status(200).json(successResponse(record))
}

export const remove = async (req: Request<{ id: string }>, res: Response) => {
  const record = await Category.findByIdAndDelete(req.params.id)

  return res.status(200).json(successResponse(record))
}
