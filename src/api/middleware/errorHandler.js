// Centralized point to handle errors
import logger from '@pkg/logger'

export const errorHandler = (err, _req, res, _next) => {
  logger.error(err.message)

  return res.status(500).json({
    error: {
      message: err.message
    }
  })
}
