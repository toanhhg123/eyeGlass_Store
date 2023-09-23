import { NextFunction, Request, Response } from 'express'
import HttpException from '../exceptions/HttpException'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
  const status = error.status || 400
  const message = error.message || 'Something went wrong'
  response.status(status).json({
    status,
    message
  })
}

export default errorMiddleware
