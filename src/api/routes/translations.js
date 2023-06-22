import { Router } from 'express'
import { getTranslatedText } from '../../services/translationService.js'

const translationRoutes = Router()

const translations = (router) => {
  router.use('/v1/translation', translationRoutes)

  translationRoutes.post('/', getTranslatedText)
}

export default translations
