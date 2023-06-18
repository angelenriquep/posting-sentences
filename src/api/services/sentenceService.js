import { createCollection, getCollectionById, getCollectionList, deleteCollection } from '@pkg/firestore'
import logger from '@pkg/logger'

const addSentence = async (req, res) => {
  try {
    const sentence = await createCollection(req.body)

    return res.send({ data: { id: sentence.id } })
  } catch (err) {
    logger.error(err)
    return res.sendStatus(500)
  }
}

const getSentences = async (req, res) => {
  try {
    const { order, offset, lmt } = req.query

    const querySnapshot = await getCollectionList(order, offset, lmt)

    const sentenceList = querySnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data().data }
    })

    return res.send(sentenceList)
  } catch (err) {
    logger.error(err.message)
    return res.sendStatus(500)
  }
}

const getSentence = async (req, res) => {
  try {
    const { id } = req.params

    const sentence = await getCollectionById(id)

    if (!sentence) {
      return res.send({ data: `sentence not found for id ${id}` })
    }

    return res.send({ id: sentence.id, ...sentence.data().data })
  } catch (err) {
    logger.error(err.message)
    return res.sendStatus(500)
  }
}

const deleteSentence = async (req, res) => {
  try {
    const { id } = req.params

    // Firebase does not expect to return anything here
    await deleteCollection(id)

    return res.sendStatus(200)
  } catch (err) {
    logger.error(err.message)
    return res.sendStatus(500)
  }
}

const updateSentence = async (req, res) => {
  try {
    const { id } = req.params

    await updateSentence(id, req.body)

    return res.send()
  } catch (err) {
    logger.error(err.message)
    return res.sendStatus(500)
  }
}

export {
  addSentence,
  getSentence,
  getSentences,
  deleteSentence,
  updateSentence
}
