const chai = require('chai');
chai.should()

const port = 5279
const url = 'http://localhost:' + port + '/lbryapi'
const r = require('request');

describe("LBRY RPC Wrapper: ", (done) => {
  describe("resolve_name", (done) => {
    it("should return a response", (done) => {
      const lbry = require('../lib/lbry');
      lbry.resolve_name('itsadisaster')
      .then((response) => {
        response.should.be.an('object').with.property('result')
        done()
      })
      .catch((error) => done(error))
    })
  })
})
