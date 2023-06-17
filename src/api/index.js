import { Router } from 'express';

import sentences from './routes/sentences.js';
import traslations from './routes/translations.js';

const router = Router();

const routes = () => {
  sentences(router);
  traslations(router);

  return router;
};

export default routes;