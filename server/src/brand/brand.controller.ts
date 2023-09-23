import { Request, Response } from 'express'
import { successResponse } from '~/types'
import Brands, { BrandDocument } from './brand.model'

export const create = async (req: Request<unknown, unknown, BrandDocument>, res: Response) => {
  const record = new Brands(req.body)
  await record.save()

  return res.status(201).json(successResponse(record))
}

export const getAll = async (req: Request<unknown, unknown, BrandDocument>, res: Response) => {
  const record = await Brands.find()

  return res.json(successResponse(record))
}

export const update = async (req: Request<{ id: string }, unknown, BrandDocument>, res: Response) => {
  const record = await Brands.findByIdAndUpdate(req.params.id, req.body)

  return res.status(200).json(successResponse(record))
}

export const remove = async (req: Request<{ id: string }>, res: Response) => {
  const record = await Brands.findByIdAndDelete(req.params.id)

  return res.status(200).json(successResponse(record))
}
