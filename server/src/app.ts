import bodyParser from 'body-parser'
import express, { Express } from 'express'
import router from './routes'
import errorMiddleware from './middleware/error.middleware'
import 'express-async-errors'
import cors from 'cors'

export const createServer = () => {
  const app: Express = express()

  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  //router

  app.use(router)

  app.use(errorMiddleware)
  return app
}
