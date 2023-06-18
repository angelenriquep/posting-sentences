'use strinct'

const { describe, beforeEach, afterEach, it, expect } = require('jest')
const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')
const translate = require('../index')

describe('Translation API', () => {
  let mockAxios

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
  })

  afterEach(() => {
    mockAxios.reset()
  })

  it('should translate text', async () => {
    const translationResponse = {
      text: 'This is the translated text'
    }

    mockAxios.onPost('https://api-free.deepl.com/v2/translate').reply(200, {
      data: translationResponse
    })

    const translation = await translate()

    expect(translation).toEqual(translationResponse)
  })

  it('should handle request error', async () => {
    mockAxios.onPost('https://api-free.deepl.com/v2/translate').networkError()

    await expect(translate()).rejects.toThrow('Network Error')
  })

  it('should handle timeout', async () => {
    mockAxios.onPost('https://api-free.deepl.com/v2/translate').timeout()

    await expect(translate()).rejects.toThrow('timeout of 5000ms exceeded')
  })
})
