import { getTraslationForText } from '@pkg/deepl-api'

export const getTranslatedText = async (data) => {
  try {
    const { text } = data

    const response = await getTraslationForText(text)

    if (response.status !== 200) {
      return 'Translation not found'
    }

    return { text: response.data.translations[0].text }
  } catch (err) {
    throw new Error(err)
  }
}
