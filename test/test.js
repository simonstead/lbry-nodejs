const chai = require('chai');
chai.should()

const port = 5279
const url = 'http://localhost:' + port + '/lbryapi'
const r = require('request');

describe("LBRY RPC Wrapper: ", (done) => {
  const lbry = require('../lib/lbry');

  describe("resolve_name", (done) => {
    it("should return a response", (done) => {
      lbry.resolve_name('itsadisaster')
      .then((response) => {
        response.should.be.an('object').with.property('result')
        done()
      })
      .catch((error) => done(error))
    })
  })

  describe("all other methods", (done) => {
    it("help", (done) => {
      lbry.help()
      .then((response) => {
        response.should.be.an('object').with.property('result')
        done()
      })
      .catch((error) => done(error))
    })

    it("help hould accept command", (done) => {
      lbry.help("blob_reflect_all")
      .then((response) => {
        response.should.be.an('object').with.property('result')
        done()
      })
      .catch((error) => done(error))
    })

    it("blob_announce_all", (done) => {
      lbry.blob_announce_all()
      .then((response) => {
        response.should.be.an('object').with.property('result')
        done()
      })
      .catch((error) => done(error))
    })

    it("blob_reflect_all", (done) => {
      lbry.blob_reflect_all()
      .then((response) => {
        response.should.be.an('object').with.property('result')
        done()
      })
      .catch((error) => done(error))
    })

    it("claim_list_mine", (done) => {
      lbry.claim_list_mine()
      .then((response) => {
        response.should.be.an('object').with.property('result')
        done()
      })
      .catch((error) => done(error))
    })

    it("daemon_stop", (done) => {
      lbry.daemon_stop()
      .then((response) => {
        response.should.be.an('object').with.property('result')
        done()
      })
      .catch((error) => done(error))
    })

    it("commands", (done) => {
      lbry.commands()
      .then((response) => {
        response.should.be.an('object').with.property('result')
        done()
      })
      .catch((error) => done(error))
    })

    it("status", (done) => {
      lbry.status()
      .then((response) => {
        response.should.be.an('object').with.property('result')
        done()
      })
      .catch((error) => done(error))
    })

    it("settings_get", (done) => {
      lbry.settings_get()
      .then((response) => {
        response.should.be.an('object').with.property('result')
        done()
      })
      .catch((error) => done(error))
    })

    it("transaction_list", (done) => {
      lbry.transaction_list()
      .then((response) => {
        response.should.be.an('object').with.property('result')
        done()
      })
      .catch((error) => done(error))
    })

    it("version", (done) => {
      lbry.version()
      .then((response) => {
        response.should.be.an('object').with.property('result')
        done()
      })
      .catch((error) => done(error))
    })

    xit("wallet_new_address", (done) => {
      lbry.wallet_new_address()
      .then((response) => {
        response.should.be.an('object').with.property('result')
        done()
      })
      .catch((error) => done(error))
    })

    describe("Methods with optional parameters", (done) => {
      it("get", (done) => {
        const blob_hash = "TEST_HASH"
        const params = {
          timeout:
        }
        lbry.get()
        .then((response) => {
          response.should.be.an('object').with.property('result')
          done()
        })
        .catch((error) => done(error))
      })
    })
  })
  // remaining methods
  //   , blob_delete, blob_get,    blob_list, ,    block_show, claim_abandon,    claim_list,    ,    claim_new_support, claim_show,    ,    daemon_stop,    descriptor_get, file_delete,    file_list,    file_seed,    get,    get_availability, help,    peer_list,    publish,    reflect,    report_bug,    resolve_name,    send_amount_to_address,    ,    settings_set,    status,    stream_cost_estimate,    ,    transaction_show,    wallet_balance,    wallet_is_address_mine,    wallet_public_key
})
