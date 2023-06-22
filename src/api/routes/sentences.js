import { Router } from 'express'
import { getSentences, addSentence, getSentence, deleteSentence, updateSentence } from '../../services/sentenceService.js'
import { requestValidation, containsIdParamRules } from '../middleware/validateSentenceRequest.js'
import asyncHandler from 'express-async-handler'

const sentencesRoutes = Router()

const sentences = (router) => {
  router.use('/v1/sentences', sentencesRoutes)

  sentencesRoutes.get('/', asyncHandler(getSentences))
  sentencesRoutes.post('/', asyncHandler(addSentence))
  sentencesRoutes.get('/:id', containsIdParamRules(), requestValidation, asyncHandler(getSentence))
  sentencesRoutes.delete('/:id', containsIdParamRules(), requestValidation, asyncHandler(deleteSentence))
  sentencesRoutes.patch('/:id', containsIdParamRules(), requestValidation, asyncHandler(updateSentence))
}

export default sentences
