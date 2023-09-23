import 'dotenv/config'

export default {
  port: process.env.PORT!,
  urlDb: process.env.URL_DB!,
  dbName: process.env.DB_NAME!,
  jwtKey: process.env.JWT_KEY!
}
