import { addSentence } from '../services/sentence.js'

const addSentenceController = async (req, res) => {
  try {
    const sentenceId = await addSentence(req.body)

    return res.send({ data: sentenceId })
  } catch (err) {
    return res.sendStatus(500)
  }
}

const getSentencesController = async (req, res) => {
  try {
    //
  } catch (err) {
    return res.sendStatus(500)
  }
}

const getSentenceController = async (req, res) => {
  try {
    //
  } catch (err) {
    return res.sendStatus(500)
  }
}

const deleteSentenceController = async (req, res) => {
  try {
    return res.sendStatus(200)
  } catch (err) {
    return res.sendStatus(500)
  }
}

const updateSentenceController = async (req, res) => {
  try {
    return res.send()
  } catch (err) {
    return res.sendStatus(500)
  }
}

export {
  addSentenceController,
  getSentenceController,
  getSentencesController,
  deleteSentenceController,
  updateSentenceController
}
