import { Router } from 'express'
import { getTranslatedText } from '../services/translation.js'

const translationRoutes = Router()

const translations = (router) => {
  router.use('/translation', translationRoutes)

  translationRoutes.post('/', getTranslatedText)
}

export default translations
