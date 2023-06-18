import express from 'express'
import logger from '@pkg/logger'
import routes from './src/api/index.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import { isAuth, notFound } from './src/api/middleware/index.js' // Promote this as a separate package
import timeout from 'connect-timeout'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import morgan from 'morgan'

// TODO: Move this to MDW folder
const haltOnTimedout = (req, res, next) => {
  if (!req.timedout) next()
}

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
app.use(express.static('public'))
// ⚠️ we should never do this, nodejs should not be serving static files
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

app.use(timeout(120000))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))
app.use(isAuth.checkAuthToken)

app.use('/api', routes())
app.use(notFound.notFoundMiddleware)
app.use(haltOnTimedout)

const PORT = +process.env.PORT || 3000
app.listen(PORT, () => { logger.info(`Server running on port: ${PORT}`) })

app
  .on('error', (error) => process.exit(error))
  .on('SIGTERM', () => {
    logger.info('SIGTERM signal received.')
    logger.info('Closing http server.')
    app.close(() => {
      logger.info('Http server closed.')
    })
  })

export default app
