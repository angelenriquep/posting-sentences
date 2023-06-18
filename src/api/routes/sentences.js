import { Router } from 'express'
import { getSentences, addSentence, getSentence, deleteSentence, updateSentence } from '../services/sentenceService.js'
import { sentenceValidationRulesAddSentence, requestValidation, sentenceValidationRulesGetSentence, containsIdParamRules } from '../middleware/validateSentenceRequest.js'

const sentencesRoutes = Router()

const sentences = (router) => {
  router.use('/sentences', sentencesRoutes)

  sentencesRoutes.get('/', sentenceValidationRulesGetSentence(), requestValidation, getSentences)
  sentencesRoutes.post('/', sentenceValidationRulesAddSentence(), requestValidation, addSentence)
  sentencesRoutes.get('/:id', containsIdParamRules(), requestValidation, getSentence)
  sentencesRoutes.delete('/:id', containsIdParamRules(), requestValidation, deleteSentence)
  sentencesRoutes.patch('/:id', containsIdParamRules(), requestValidation, updateSentence)
}

export default sentences
