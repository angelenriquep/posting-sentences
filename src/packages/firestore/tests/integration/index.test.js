/* eslint-disable no-unused-expressions */
/* eslint-disable n/handle-callback-err */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import * as firebaseModule from '../../index.js'
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

describe('Integration test for firestore', () => {
  before(async () => {
    // TODO: clean all records of a firestore db (not recomemded by them https://firebase.google.com/docs/firestore/manage-data/delete-data#web)
  })

  after(async () => {
    // TODO: clean all records of a firestore db so we dont get in inconsistent state
  })

  it('should return a new document id from sentences store', async () => {
    const sentenceId = await firebaseModule.createRecord(data)
    expect(sentenceId).to.not.equal(null)
  })

  it('should delete a document from sentences store', async () => {
    try {
      const sentenceId = await firebaseModule.createRecord(data)
      expect(sentenceId).to.not.equal(null)

      await firebaseModule.deleteRecord(sentenceId)
      expect(sentenceId).to.not.equal(null)
    } catch (err) {
      expect(err).to.not.equal(null)
    }
  })
})
