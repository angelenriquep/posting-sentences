import 'dotenv/config'
import { isAuth, notFound, haltOnTimedout } from './middleware/index.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import logger from '@pkg/logger'
import morgan from 'morgan'
import routes from './router.js'
import timeout from 'connect-timeout'
import promBundle from 'express-prom-bundle'

const metricsMiddleware = promBundle({ includeMethod: true })
let server = null

export function startApp() {
  const app = express()

  app.use(timeout(12_000))
  app.use(bodyParser.json())
  app.use(cors())
  app.use(morgan('dev', {
    skip: () => process.env.NODE_ENV === 'test',
    stream: { write: message => logger.info(message) }
  }))
  app.use(isAuth.checkAuthToken)
  app.use(metricsMiddleware)
  app.use('/api/v1', routes())
  app.use(notFound.notFoundMiddleware)
  app.use(haltOnTimedout)

  const PORT = +process.env.PORT || 3_000
  server = app.listen(PORT, () => { logger.info(`server running on port: ${PORT}`) })

  app
    .on('error', (error) => process.exit(error))
    .on('SIGTERM', () => {
      logger.info('SIGTERM signal received, closing http server...')
      app.close(() => logger.info('http server closed.'))
    })

  return app
}

function gracefulShutdown() {
  logger.info('shutting down gracefully...')

  server.close(() => {
    logger.info('server closed.')
    // Close any other connections or resources here
    process.exit(0)
  })

  setTimeout(() => {
    console.error('could not close connections in time, forcefully shutting down')
    process.exit(1)
  }, 5000)
}

process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)
