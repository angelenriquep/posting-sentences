import { Router } from 'express'
import * as controller from '../controller/sentence.js'
import { requestValidation, containsIdParamRules } from '../middleware/index.js'
import asyncHandler from 'express-async-handler'

const sentencesRoutes = Router()

const sentences = (router) => {
  router.use('/sentences', sentencesRoutes)

  sentencesRoutes.get('/', asyncHandler(controller.getSentencesController))
  sentencesRoutes.post('/', asyncHandler(controller.addSentenceController))
  sentencesRoutes.get('/:id', containsIdParamRules(), requestValidation, asyncHandler(controller.getSentenceController))
  sentencesRoutes.delete('/:id', containsIdParamRules(), requestValidation, asyncHandler(controller.deleteSentenceController))
  sentencesRoutes.patch('/:id', containsIdParamRules(), requestValidation, asyncHandler(controller.updateSentenceController))
}

export default sentences
