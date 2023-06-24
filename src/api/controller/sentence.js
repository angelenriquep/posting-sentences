import { addSentence } from '../services/sentence.js'

const addSentenceController = async (req, res, next) => {
  try {
    const sentenceId = await addSentence(req.body)
    return res.send({ data: sentenceId })
  } catch (err) {
    next(err)
  }
}

const getSentencesController = async (req, res, next) => {
  try {
    //
  } catch (err) {
    next(err)
  }
}

const getSentenceController = async (req, res, next) => {
  try {
    //
  } catch (err) {
    next(err)
  }
}

const deleteSentenceController = async (req, res, next) => {
  try {
    return res.status(200)
  } catch (err) {
    next(err)
  }
}

const updateSentenceController = async (req, res, next) => {
  try {
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
