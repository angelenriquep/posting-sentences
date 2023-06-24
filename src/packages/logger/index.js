import { createLogger, format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const logFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`
})

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp(),
    logFormat
  ),
  transports: [
    new transports.File({ filename: './logs/app-error.log', level: 'error' }),
    new transports.File({ filename: './logs/app-combined.log', level: 'info' }),
    new DailyRotateFile({
      filename: './logs/app-combined/app-combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '1m'
    })
  ]
})

// If we're not in production then **ALSO** log to the `console`
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.errors({ stack: true }),
        format.timestamp(),
        logFormat
      )
    })
  )
}

export default logger
