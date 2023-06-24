/* eslint-disable no-unused-expressions */
/* eslint-disable n/handle-callback-err */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { addSentence } from '../../../src/api/services/sentence.js'
import { expect } from 'chai'

// NB: easy to test integrity restrictions, also its more performant and
// we dont have to import the entire api
const data = {
  text: 'â€¢Reisebereitschaft.',
  category: 'Sofware Architect',
  skills: {
    responsibility: 0,
    benefit: 0,
    none: 0,
    education: 0,
    experience: 0,
    soft: 1,
    tech: 0
  }
}

const stubStore = {
  createRecord: async () => {
    return { id: 'sentenceId' }
  }
}

describe('Sentence service addSentence tests', () => {
  it('should return a new sentence id', async () => {
    const sentenceId = await addSentence(stubStore, data)
    expect(sentenceId).to.equal('sentenceId')
  })

  it('should return an error if a missing field is passed', async () => {
    const invalidData = { ...data }
    delete invalidData.category

    try {
      await addSentence(stubStore, invalidData)
    } catch (err) {
      expect(err.message).to.equal('Error: category field is required')
    }
  })

  it('should return an error if not enought length in text field', async () => {
    const invalidData = { ...data }
    invalidData.text = ''

    try {
      await addSentence(stubStore, invalidData)
    } catch (err) {
      expect(err.message).to.equal('Error: text field is required')
    }
  })
})
