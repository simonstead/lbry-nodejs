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

module.exports = lbry
