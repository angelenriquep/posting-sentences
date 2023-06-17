import { Router } from 'express'
import { getTranslations } from '../services/translationService.js'
import { translationValidation, addSentenceValidation } from '../middleware/validateTraslationRequest.js'

const translationRoutes = Router()

const translations = (router) => {
  router.use('/translation', translationRoutes)

  translationRoutes.post('/', translationValidation(), addSentenceValidation, getTranslations)
}

export default translations
