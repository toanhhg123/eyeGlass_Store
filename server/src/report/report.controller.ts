import { Request, Response } from 'express'
import Product from '~/product/product.model'
import User from '~/user/user.model'
import Order from '~/order/order.model'
import { successResponse } from '~/types'

export const report = async (req: Request, res: Response) => {
  const products = await Product.find()
  const orders = await Order.find().populate('shipping').populate('user').populate('product')
  const users = await User.find()

  return res.json(
    successResponse({
      products,
      orders,
      users
    })
  )
}
