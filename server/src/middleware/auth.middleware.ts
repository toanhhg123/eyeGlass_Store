import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import env from '../config/env'
import HttpException from '../exceptions/HttpException'

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  let token = req.headers.authorization

  if (!token && !token?.startsWith('Bearer')) throw new HttpException(401, 'authencate')

  token = token.replace('Bearer ', '')

  const jwtPayload = <typeof req.user>jwt.verify(token, env.jwtKey!)

  req.user = jwtPayload

  next()
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role !== 'admin') throw new HttpException(403, 'forbbiden')
  return next()
}

export const isEmployee = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role !== 'employee') throw new HttpException(403, 'forbbiden')
  return next()
}

export const isEmployeeOrAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!['employee', 'admin'].includes(req.user.role)) throw new HttpException(403, 'forbbiden')
  return next()
}
