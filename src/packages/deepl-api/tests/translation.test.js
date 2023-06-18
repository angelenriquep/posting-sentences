import chai, { expect } from 'chai'
import { describe, afterEach, it } from 'mocha'
import sinon from 'sinon'
import axios from 'axios'
import { getTraslationForText } from '../index.js'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)

describe('getTranslationForText', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('should return the translation data', async () => {
    const url = 'https://api-free.deepl.com/v2/translate'
    const authKey = 'b3a7e4ea-53bf-1e55-d634-b02c8526b380:fx'

    const headers = {
      Authorization: `DeepL-Auth-Key ${authKey}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    // Mock the Axios post request
    const axiosPostStub = sinon.stub(axios, 'post')
    axiosPostStub.resolves({
      data: {
        text: 'Translated text'
      }
    })

    // Call the function
    const translationPromise = getTraslationForText('Hello')

    // Assert the response
    await expect(translationPromise).to.eventually.deep.equal({
      data: { text: 'Translated text' }
    })

    // Assert that Axios was called with the correct parameters
    expect(axiosPostStub.calledOnce).to.be.true
    expect(axiosPostStub.args[0][0]).to.equal(url)
    expect(axiosPostStub.args[0][1].toString()).to.equal('text=Hello&target_lang=en-GB')
    expect(axiosPostStub.args[0][2]).to.deep.equal({
      headers,
      timeout: 10000
    })
  })

  it('should handle errors and reject the promise', async () => {
    const url = 'https://api-free.deepl.com/v2/translate'
    const authKey = 'b3a7e4ea-53bf-1e55-d634-b02c8526b380:fx'

    const headers = {
      Authorization: `DeepL-Auth-Key ${authKey}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    // Mock the Axios post request to throw an error
    const axiosPostStub = sinon.stub(axios, 'post')
    axiosPostStub.rejects(new Error('Request failed'))

    // Call the function
    const translationPromise = getTraslationForText('Hello')

    // Assert that the promise is rejected
    await expect(translationPromise).to.be.rejectedWith('Request failed')

    // Assert that Axios was called with the correct parameters
    expect(axiosPostStub.calledOnce).to.be.true
    expect(axiosPostStub.args[0][0]).to.equal(url)
    expect(axiosPostStub.args[0][1].toString()).to.equal('text=Hello&target_lang=en-GB')
    expect(axiosPostStub.args[0][2]).to.deep.equal({
      headers,
      timeout: 10000
    })
  })
})
