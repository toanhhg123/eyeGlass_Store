import { Request, Response } from 'express'
import { PageQuery, successResponse } from '~/types'
import Product, { ProductDocument } from './product.model'
import { FilterQuery } from 'mongoose'
import Order from '~/order/order.model'

export const create = async (req: Request<unknown, unknown, ProductDocument>, res: Response) => {
  const record = new Product(req.body)
  await record.save()

  return res.status(201).json(successResponse(record))
}

export const getAll = async (req: Request<unknown, unknown, ProductDocument>, res: Response) => {
  const query = req.query as PageQuery

  const search = query.search ?? ''
  const pageIndex = Number(query.pageIndex) || 1
  const categoryId = query.categoryId
  const brandId = query.brandId

  const limit = 12

  const filterQuery: FilterQuery<ProductDocument> = {
    name: { $regex: search, $options: 'i' }
  }

  if (categoryId) filterQuery.category = categoryId
  if (brandId) filterQuery.category = brandId

  const record = await Product.find(filterQuery)
    .populate('brand')
    .populate('category')
    .skip((pageIndex - 1) * limit)
    .limit(limit)

  return res.json(
    successResponse({
      search,
      record,
      pageIndex,
      limit,
      total: await Product.count(filterQuery)
    })
  )
}

export const findOne = async (req: Request<{ id: string }>, res: Response) => {
  const record = await Product.findById(req.params.id).populate('brand').populate('category')

  return res.status(200).json(successResponse(record))
}

export const update = async (req: Request<{ id: string }, unknown, ProductDocument>, res: Response) => {
  const record = await Product.findByIdAndUpdate(req.params.id, req.body)

  return res.status(200).json(successResponse(record))
}

export const remove = async (req: Request<{ id: string }>, res: Response) => {
  const record = await Product.findByIdAndDelete(req.params.id)
  Order.deleteMany({
    product: req.params.id
  })

  return res.status(200).json(successResponse(record))
}
