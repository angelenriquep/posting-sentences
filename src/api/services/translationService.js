import { getTraslationForText } from '@pkg/deepl-api'
import logger from '@pkg/logger'

export const getTranslatedText = async (req, res) => {
  try {
    const { text } = req.body

    const response = await getTraslationForText(text)

    if (response.status !== 200) {
      return res.send('Translation not found')
    }

    return res.send({ data: { text: response.data.translations[0].text } })
  } catch (error) {
    logger.error(error.message)
    return res.sendStatus(500)
  }
}
