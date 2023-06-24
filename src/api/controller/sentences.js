import * as sentenceService from '../services/sentence.js'
import * as fireStore from '@pkg/firestore'

// NB unify request? so we ensure we always send data back?
// dependency here:  injection to my use cases

const addSentenceController = async (req, res, next) => {
  try {
    const sentenceId = await sentenceService.addSentence(fireStore, req.body)
    return res.status(201).send({ data: sentenceId })
  } catch (err) {
    next(err)
  }
}

const getSentencesController = async (req, res, next) => {
  try {
    const sentences = sentenceService.getSentences(fireStore, req.params)

    return res.send({ data: sentences })
  } catch (err) {
    next(err)
  }
}

const getSentenceController = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) throw new Error('id is required param')

    const sentence = sentenceService.getSentence(fireStore, id)

    return res.send({ data: sentence })
  } catch (err) {
    next(err)
  }
}

const deleteSentenceController = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) throw new Error('id is required param')

    sentenceService.deleteSentence(fireStore, id)

    return res.send()
  } catch (err) {
    next(err)
  }
}

const updateSentenceController = async (req, res, next) => {
  try {
    sentenceService.updateSentence(fireStore, req.params)

    return res.send()
  } catch (err) {
    next(err)
  }
}

export {
  addSentenceController,
  getSentenceController,
  getSentencesController,
  deleteSentenceController,
  updateSentenceController
}
