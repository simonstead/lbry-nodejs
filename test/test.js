const chai = require('chai');
chai.should()

const port = 5279
const url = 'http://localhost:' + port + '/lbryapi'
const r = require('request');



describe("LBRY RPC Wrapper: ", (done) => {
  const lbry = require('../lib/lbry');

  describe("today's tests", (done) => {
    it("find a claim", (done) => {
      lbry.file_list({
        claim_id: '1e8e7ab72195a00a7d639a3260b0770d3ff9bef0'
      })
      .then((response) => {
        response.should.be.an('object').with.property('result')
        done()
      })
      .catch((error) => done(error))
    })

    it.only("should download a free file", (done) => {
      const expectedName = "princess-bubblegum"
      lbry.claim_show(expectedName)
      .then((response) => {
        response.should.be.an('object').with.property('result')
        response.result.should.be.an('object').with.property('value')
        const name = response.result.name
        const feeObject = response.result.value.stream.metadata.fee
        let cost;
        if (feeObject) {
          cost = feeObject.amount
        } else {
          lbry.get(name, { download_directory: "/Users/SteaSi/Downloads/LBRY_TEST" })
          .then((response) => {
            console.dir(response);
            response.should.be.an('object').with.property('result')
            done()
          })
          .catch((error) => done(error))
        }
      })
      .catch((error) => done(error))
    })
  })

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

  describe("channel_list_mine", (done) => {
    it("should return a response", (done) => {
      lbry.channel_list_mine()
      .then((response) => {
        response.should.be.an('object').with.property('result')
        done()
      })
      .catch((error) => done(error))
    })
  })

  describe("channel_new", (done) => {
    xit("should create a channel", (done) => {
      const name = "@" + "testchannel" + Math.floor(100000*Math.random())
      const amount = 1
      lbry.channel_new(name,amount)
      .then((response) => {
        console.log(response);
        response.should.be.an('object').with.property('result')
        done()
      })
      .catch((error) => done(error))
    })
  })

  describe("all other methods", (done) => {
    describe("Methods with optional parameters", (done) => {
      xit("get", (done) => {
        const blob_hash = "TEST_HASH"
        const params = {
          timeout: "RWTEGRT"
        }
        lbry.get()
        .then((response) => {
          response.should.be.an('object').with.property('result')
          done()
        })
        .catch((error) => done(error))
      })

      it("help", (done) => {
        lbry.help()
        .then((response) => {
          response.should.be.an('object').with.property('result')
          done()
        })
        .catch((error) => done(error))
      })

      xit("blob_announce_all", (done) => {
        lbry.blob_announce_all()
        .then((response) => {
          response.should.be.an('object').with.property('result')
          done()
        })
        .catch((error) => done(error))
      })

      it("wallet_balance", (done) => {
        lbry.wallet_balance()
        .then((response) => {
          response.should.be.an('object').with.property('result')
          done()
        })
        .catch((error) => done(error))
      })

      xit("blob_reflect_all", (done) => {
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

      xit("daemon_stop", (done) => {
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

      it("blob_delete", (done) => {
        const blob_hash = "blob_hash"
        lbry.blob_delete(blob_hash)
        .then((response) => {
          response.should.be.an('object').with.property('result')
          done()
        })
        .catch((error) => done(error))
      })
      xit("blob_get", (done) => {
        const blob_hash = "blob_hash"
        lbry.blob_get(blob_hash)
        .then((response) => {
          response.should.be.an('object').with.property('result')
          done()
        })
        .catch((error) => done(error))
      })
      xit("blob_list", (done) => {
        const params = {
          page_size: 4
        }
        lbry.blob_list(params)
        .then((response) => {
          response.should.be.an('object').with.property('result')
          done()
        })
        .catch((error) => done(error))
      })

      it("claim_abandon", (done) => {
        const params = {
          txid: "TEST_TXID",
          nout: "NOUT"
        }
        lbry.claim_abandon(params)
        .then((response) => {
          response.should.be.an('object').with.property('result')
          done()
        })
        .catch((error) => done(error))
      })

      xit("block_show", (done) => {
        const params = {
          blockhash: "TEST_HASH"
        }
        lbry.claim_list(params)
        .then((response) => {
          response.should.be.an('object').with.property('result')
          done()
        })
        .catch((error) => done(error))
      })

      xit("claim_new_support", (done) => {
        const params =  {
          name: "TEST_NAME",
          claim_id: "claim_id",
          amount: 0
        }
        lbry.claim_new_support(params)
        .then((response) => {
          response.should.be.an('object').with.property('result')
          done()
        })
        .catch((error) => done(error))
      })

      xit("blob_list", (done) => {
        const params =  {
          page_size: 4
        }
        lbry.blob_list(params)
        .then((response) => {
          response.should.be.an('object').with.property('result')
          done()
        })
        .catch((error) => done(error))
      })

      xit("block_show", (done) => {
        const params =  {
          blockhash: "blockhash"
        }
        lbry.block_show(params)
        .then((response) => {
          response.should.be.an('object').with.property('result')
          done()
        })
        .catch((error) => done(error))
      })

      xit("descriptor_get", (done) => {
        const params =  {
          sd_hash: "sd_hash"
        }
        lbry.descriptor_get(params)
        .then((response) => {
          response.should.be.an('object').with.property('result')
          done()
        })
        .catch((error) => done(error))
      })

      it("file_delete", (done) => {
        const params =  {}
        lbry.file_delete()
        .then((response) => {
          response.should.be.an('object').with.property('result')
          done()
        })
        .catch((error) => done(error))
      })

      xit("file_seed", (done) => {
        const params =  {
          status: "status"
        }
        lbry.file_seed(params)
        .then((response) => {
          response.should.be.an('object').with.property('result')
          done()
        })
        .catch((error) => done(error))
      })

      it("get_availability", (done) => {
        const params =  {
          name: "name"
        }
        lbry.get_availability(params)
        .then((response) => {
          response.should.be.an('object').with.property('result')
          done()
        })
        .catch((error) => done(error))
      })

      xit("peer_list", (done) => {
        const params =  {
          blob_hash: "blob_hash"
        }
        lbry.peer_list(params)
        .then((response) => {
          response.should.be.an('object').with.property('result')
          done()
        })
        .catch((error) => done(error))
      })

      xit("publish", (done) => {
        const params =  {
          name: "name",
          bid: 0,
          metadata: {}
        }
        lbry.publish(params)
        .then((response) => {
          response.should.be.an('object').with.property('result')
          done()
        })
        .catch((error) => done(error))
      })

      xit("report_bug", (done) => {
        const params =  {
          message: "THIS IS A TEST MESSAGE FROM UNIT TESTS"
        }
        lbry.report_bug(params)
        .then((response) => {
          response.should.be.an('object').with.property('result')
          done()
        })
        .catch((error) => done(error))
      })

      xit("send_amount_to_address", (done) => {
        const params =  {
          amount: 0,
          address: 'address'
        }
        lbry.send_amount_to_address(params)
        .then((response) => {
          response.should.be.an('object').with.property('result')
          done()
        })
        .catch((error) => done(error))
      })

      it("file_list", (done) => {
        lbry.file_list()
        .then((response) => {
          response.should.be.an('object').with.property('result')
          done()
        })
        .catch((error) => done(error))
      })

      xit("claim_show", (done) => {
        const params =  {
          name: 'TEST_NAME'
        }
        lbry.claim_show(params)
        .then((response) => {
          response.should.be.an('object').with.property('result')
          done()
        })
        .catch((error) => done(error))
      })

      xit("stream_cost_estimate", (done) => {
        const params =  {
          name: 'TEST_NAME'
        }
        lbry.stream_cost_estimate(params)
        .then((response) => {
          response.should.be.an('object').with.property('result')
          done()
        })
        .catch((error) => done(error))
      })

      xit("reflect", (done) => {
        const params =  {
          sd_hash: 'sd_hash'
        }
        lbry.reflect(params)
        .then((response) => {
          response.should.be.an('object').with.property('result')
          done()
        })
        .catch((error) => done(error))
      })

      xit("transaction_show", (done) => {
        const params =  {
          txid: 'txid'
        }
        lbry.transaction_show(params)
        .then((response) => {
          response.should.be.an('object').with.property('result')
          done()
        })
        .catch((error) => done(error))
      })

      it("wallet_is_address_mine", (done) => {
        const params =  {
          address: 'address'
        }
        lbry.wallet_is_address_mine(params)
        .then((response) => {
          response.should.be.an('object').with.property('result')
          done()
        })
        .catch((error) => done(error))
      })

      xit("wallet_public_key", (done) => {
        const params =  {
          wallet: 'wallet'
        }
        lbry.wallet_public_key(params)
        .then((response) => {
          response.should.be.an('object').with.property('result')
          done()
        })
        .catch((error) => done(error))
      })

      xit("settings_set", (done) => {
        const params =  {
           data_rate: 0,
           max_key_fee: 0,
           download_directory: '/',
           download_timeout: 60
         }
        lbry.settings_set(params)
        .then((response) => {
          response.should.be.an('object').with.property('result')
          done()
        })
        .catch((error) => done(error))
      })
    })
  })
})
