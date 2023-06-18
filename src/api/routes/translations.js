import { Router } from 'express'
import { getTranslatedText } from '../services/translationService.js'
import { translationValidation, addSentenceValidation } from '../middleware/validateTraslationRequest.js'

const translationRoutes = Router()

const translations = (router) => {
  router.use('/translation', translationRoutes)

  translationRoutes.post('/', translationValidation(), addSentenceValidation, getTranslatedText)
}

export default translations
