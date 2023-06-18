import { createLogger, format, transports } from 'winston'

const logConfiguration = {
  format: format.combine(
    format.splat(),
    format.simple()
  ),
  transports: [new transports.Console()]
}

const logger = createLogger(logConfiguration)

export default logger
