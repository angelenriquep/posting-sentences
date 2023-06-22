// /* eslint-disable n/handle-callback-err */
// /* eslint-disable no-unused-vars */
// /* eslint-disable no-undef */

// import chai, { expect } from 'chai'
// import chaiHttp from 'chai-http'
// import server from '../server.js'

// chai.should()
// chai.use(chaiHttp)

// const document = '0pO3peAQVg4kZuf2mG8K'

// describe('/GET Sentence', () => {
//   it('returns 401 when no auth token is sent', (done) => {
//     chai.request(server)
//       .get(`/api/sentences/${document}`)
//       .end((err, res) => {
//         expect(res).to.have.status(401)
//         done()
//       })
//   })
// })

// describe('Sentences', () => {
//   describe('/GET Sentences', () => {
//     it('It should GET the first 5 sentences', (done) => {
//       chai.request(server)
//         .get('/api/sentences')
//         .set('Authorization', 'Bearer your_token_here')
//         .query({ page: 0, pageSize: 5 })
//         .end((err, res) => {
//           expect(res).to.have.status(200)
//           done()
//         })
//     })
//   })

//   describe('/GET Sentence', () => {
//     it('returns 200 when a sentence is found', (done) => {
//       chai.request(server)
//         .get(`/api/sentences/${document}`)
//         .set('Authorization', 'Bearer your_token_here')
//         .end((err, res) => {
//           expect(res).to.have.status(200)
//           done()
//         })
//     })
//   })
// })
