import express from 'express';
import logger from '@pkg/logger';
import routes from './src/api/index.js';
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express();

app.use(bodyParser.json())
app.use(cors())

app.use('/api', routes());

const PORT = +process.env.PORT || 3000
app.listen(PORT, () => { logger.info(`Server running on port: ${PORT}`) });

app
  .on('error', (error) => exit(error))
  .on('SIGTERM', () => {
    logger.info('SIGTERM signal received.');
    logger.info('Closing http server.');
    server.close(() => {
      logger.info('Http server closed.');
    });
  });

export default app;
