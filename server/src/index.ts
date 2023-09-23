import { createServer } from './app'
import env from './config/env'
import './config/db'

const app = createServer()

app.listen(env.port, async () => {
  console.log(`Server is running at http://localhost:${env.port}`)
})
