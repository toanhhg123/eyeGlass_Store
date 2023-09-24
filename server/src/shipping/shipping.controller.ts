import { Request, Response } from 'express'
import { successResponse } from '~/types'
import Shipping, { shippingDocument } from './shipping.model'

export const create = async (req: Request<unknown, unknown, shippingDocument>, res: Response) => {
  const record = new Shipping(req.body)
  await record.save()

  return res.status(201).json(successResponse(record))
}

export const getAll = async (req: Request<unknown, unknown, shippingDocument>, res: Response) => {
  const record = await Shipping.find()

  return res.json(successResponse(record))
}

export const update = async (req: Request<{ id: string }, unknown, shippingDocument>, res: Response) => {
  const record = await Shipping.findByIdAndUpdate(req.params.id, req.body)

  return res.status(200).json(successResponse(record))
}

export const remove = async (req: Request<{ id: string }>, res: Response) => {
  const record = await Shipping.findByIdAndDelete(req.params.id)

  return res.status(200).json(successResponse(record))
}
