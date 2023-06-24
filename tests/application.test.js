/* eslint-disable n/handle-callback-err */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { startApp } from '../src/api/server.js'

chai.should()
chai.use(chaiHttp)

const server = startApp()

const document = '0pO3peAQVg4kZuf2mG8K' // Cunrently can be random, not idempotency affected

describe('/GET Sentence', () => {
  it('returns 401 when no auth token is sent', (done) => {
    chai.request(server)
      .get(`/api/sentences/${document}`)
      .end((err, res) => {
        expect(res).to.have.status(401)
        done()
      })
  })
})
