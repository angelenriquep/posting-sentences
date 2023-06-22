import 'dotenv/config'
import { isAuth, notFound, haltOnTimedout } from './middleware/index.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import logger from '@pkg/logger'
import morgan from 'morgan'
import routes from './router.js'
import timeout from 'connect-timeout'

export const startApp = () => {
  const app = express()

  app.use(timeout(12_000))
  app.use(bodyParser.json())
  app.use(cors())
  app.use(morgan('dev', {
    skip: () => process.env.NODE_ENV === 'test',
    stream: { write: message => logger.info(message) }
  }))
  app.use(isAuth.checkAuthToken)
  app.use('/api/v1', routes())
  app.use(notFound.notFoundMiddleware)
  app.use(haltOnTimedout)

  const PORT = +process.env.PORT || 3_000
  app.listen(PORT, () => { logger.info(`Server running on port: ${PORT}`) })

  app
    .on('error', (error) => process.exit(error))
    .on('SIGTERM', () => {
      logger.info('SIGTERM signal received, closing http server...')
      app.close(() => logger.info('http server closed.'))
    })

  return app
}

// Crea un graceful shutdown
// Crea un pool de request
