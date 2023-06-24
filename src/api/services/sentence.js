import { sentenceValidationRulesAddSentence } from '../validators/sentence.js'

/**
 * Agnostic service, it does not case about implementations
 * Composition without integrity restriction at constructor level
 * Our services are not coupeled to the express framework, we do
 * not receive callbacks from express
 * NB: use deepool?
 */

const addSentence = async (repository, data) => {
  try {
    const { error, value } = sentenceValidationRulesAddSentence().validate(data)

    if (error) throw new Error(error.details[0].message)

    const newSentenceId = await repository.createRecord(value)

    return newSentenceId
  } catch (err) {
    throw new Error(err)
  }
}

const getSentences = async (repository, filter) => {
  try {
    const { order, page, pageSize } = filter

    const collection = await repository.getRecors(order, page, pageSize)

    const sentences = collection.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    })

    return sentences
  } catch (err) {
    throw new Error(err)
  }
}

const getSentence = async (repository, id) => {
  try {
    const sentence = await repository.getRecordById(id)

    if (!sentence) {
      return { data: `sentence not found for id ${id}` }
    }

    return { id: sentence.id, ...sentence.data() }
  } catch (err) {
    throw new Error(err)
  }
}

const deleteSentence = async (repository, id) => {
  try {
    await repository.deleteRecord(id)
  } catch (err) {
    throw new Error(err)
  }
}

const updateSentence = async (repository, data) => {
  try {
    const { id } = data

    await repository.updateRecord(id, data)
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
