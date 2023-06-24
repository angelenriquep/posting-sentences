import { createCollection, getCollectionById, getCollectionList, deleteCollection } from '@pkg/firestore'
import { sentenceValidationRulesAddSentence } from '../validators/sentence.js'

// use deepool? | our services are not coupeled to the express framework
const addSentence = async (data) => {
  try {
    const { error, value } = sentenceValidationRulesAddSentence().validate(data)

    if (error) throw new Error(error.details[0].message)

    const sentence = await createCollection(value)

    return sentence.id
  } catch (err) {
    throw new Error(err)
  }
}

const getSentences = async (data) => {
  try {
    const { order, page, pageSize } = data

    const collection = await getCollectionList(order, page, pageSize)

    const sentences = collection.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    })

    return sentences
  } catch (err) {
    throw new Error(err)
  }
}

const getSentence = async (params) => {
  try {
    const { id } = params

    const sentence = await getCollectionById(id)

    if (!sentence) {
      return { data: `sentence not found for id ${id}` }
    }

    return { id: sentence.id, ...sentence.data() }
  } catch (err) {
    throw new Error(err)
  }
}

const deleteSentence = async (data) => {
  try {
    const { id } = data

    // Firebase does not expect to return anything here
    await deleteCollection(id)
  } catch (err) {
    throw new Error(err)
  }
}

const updateSentence = async (data) => {
  try {
    const { id } = data

    await updateSentence(id, data)
  } catch (err) {
    throw new Error(err)
  }
}

export {
  addSentence,
  getSentence,
  getSentences,
  deleteSentence,
  updateSentence
}
