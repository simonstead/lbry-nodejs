const r = require('request');
const lbry = {}
const url = 'http://127.0.0.1:5279/lbryapi'

const _request = (method_name, params) => {
  const options = {
    url: url,
    method: 'POST',
    body: {
      method: method_name,
      params: params
    },
    json: true
  }

  let requestPromise = new Promise((resolve, reject) => {
    const callback = (error, response, body) => {
      resolve(error || body)
    }
    r.post(options, callback)
  })

  return requestPromise
}

// methods

lbry.resolve_name = (name) => {
  const method = "resolve_name"
  const params = {
    name: name
  }
  return _request(method, params)
}

lbry.help = (command) => {
  if (command) {
    return _request("help", { command: command})
  } else {
    return _request("help")
  }
}

lbry.version = () => { return _request("version") }

lbry.wallet_new_address = () => { return _request("wallet_new_address") }

lbry.transaction_list = () => { return _request("transaction_list") }

lbry.settings_get = () => { return _request("settings_get") }

lbry.status = () => { return _request("status") }

lbry.commands = () => { return _request("commands") }

lbry.daemon_stop = () => { return _request("daemon_stop") }

lbry.claim_list_mine = () => { return _request("claim_list_mine") }

lbry.blob_reflect_all = () => { return _request("blob_reflect_all") }

lbry.blob_announce_all = () => { return _request("blob_announce_all") }





module.exports = lbry
