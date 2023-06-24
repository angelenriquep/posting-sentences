import { Router } from 'express'
import * as controller from '../controller/sentences.js'
import asyncHandler from 'express-async-handler'

const sentencesRoutes = Router()

const sentences = (router) => {
  router.use('/sentences', sentencesRoutes)

  sentencesRoutes.get('/', asyncHandler(controller.getSentencesController))
  sentencesRoutes.post('/', asyncHandler(controller.addSentenceController))
  sentencesRoutes.get('/:id', asyncHandler(controller.getSentenceController))
  sentencesRoutes.delete('/:id', asyncHandler(controller.deleteSentenceController))
  sentencesRoutes.patch('/:id', asyncHandler(controller.updateSentenceController))
}

export default sentences
