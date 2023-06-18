// import { getTranslation } from '@pkg/yandex-api'

export const getTranslations = async (req, res) => {
  try {
    // const {
    //   text
    // } = req.body

    // const textTransation = getTranslation(text)

    // if (!translation) {
    //   return response.notFound(res, 'Translation not found')
    // }

    // return res.send({ data: { text: translation } })
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}
