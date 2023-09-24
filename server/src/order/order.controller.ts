import { Request, Response } from 'express'
import { PageQuery, successResponse } from '~/types'
import Order, { OrderDocument } from './order.model'
import { FilterQuery } from 'mongoose'
import Product from '~/product/product.model'

export const create = async (req: Request<unknown, unknown, OrderDocument>, res: Response) => {
  const { _id } = req.user

  const { product, quantity } = req.body

  const productDb = await Product.findById(product)

  if (!productDb || productDb.quantity < 1) {
    throw new Error('đơn hàng hiện tại đang hết ')
  }

  productDb.quantity = productDb.quantity - quantity

  const record = new Order({
    ...req.body,
    user: _id,
    price: (productDb.price - productDb.price * (productDb.discount / 100)) * quantity
  })

  await Promise.all([productDb.save(), record.save()])

  return res.status(201).json(successResponse(record))
}

export const getMyOrder = async (req: Request<unknown, unknown, OrderDocument>, res: Response) => {
  const { _id } = req.user

  const record = await Order.find({ user: _id }).populate('shipping').populate('user').populate('product')

  return res.status(201).json(successResponse(record))
}

export const getAll = async (req: Request<unknown, unknown, OrderDocument>, res: Response) => {
  const query = req.query as PageQuery

  const pageIndex = Number(query.pageIndex) || 1
  const shippingId = query.shippingId

  const limit = 12

  const filterQuery: FilterQuery<OrderDocument> = {}

  if (shippingId) filterQuery.shipping = shippingId

  const record = await Order.find(filterQuery)
    .populate('shipping')
    .populate('user')
    .populate('product')
    .skip((pageIndex - 1) * limit)
    .limit(limit)

  return res.json(
    successResponse({
      record,
      pageIndex,
      limit,
      total: await Order.count(filterQuery)
    })
  )
}

export const update = async (req: Request<{ id: string }, unknown, OrderDocument>, res: Response) => {
  const record = await Order.findByIdAndUpdate(req.params.id, req.body)

  console.log(record)
  return res.status(200).json(successResponse(record))
}

export const remove = async (req: Request<{ id: string }>, res: Response) => {
  const record = await Order.findByIdAndDelete(req.params.id)

  return res.status(200).json(successResponse(record))
}
