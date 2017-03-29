const r = require('request');
const lbry = {}
const url = 'http://127.0.0.1:5279/lbryapi'

const _request = (method_name, params) => {
  const options = {
    url: url,
    method: 'POST',
    body: {
      method: method_name
    },
    json: true
  }

  if (params) {
    options.body.params = params
  }

  let requestPromise = new Promise((resolve, reject) => {
    const callback = (error, response, body) => {
      resolve(error || body)
    }
    r.post(options, callback)
  })

  return requestPromise
}


//////////////
// Methods ///
//////////////


// Resolve stream info from a LBRY name
//
// Args:
//     'name': (str) name to look up, do not include lbry:// prefix
// Returns:
//     (dict) Metadata dictionary from name claim, None if the name is not
//             resolvable
lbry.resolve_name = (name) => {
  const method = "resolve_name"
  const params = {
    name: name
  }
  return _request(method, params)
}

// Return a useful message for an API command
//
// Args:
//     'command'(optional): (str) command to retrieve documentation for
// Returns:
//     (str) if given a command, returns documentation about that command
//     otherwise returns general help message
lbry.help = (command) => {
  if (command) {
    return _request("help", { command: command})
  } else {
    return _request("help")
  }
}

// Get lbry version information
//
// Args:
//     None
// Returns:
//     (dict) Dictionary of lbry version information
//     {
//         'platform': (str) platform string
//         'os_release': (str) os release string
//         'os_system': (str) os name
//         'lbrynet_version': (str) lbrynet_version,
//         'lbryum_version': (str) lbryum_version,
//         'ui_version': (str) commit hash of ui version being used
//         'remote_lbrynet': (str) most recent lbrynet version available from github
//         'remote_lbryum': (str) most recent lbryum version available from github
//     }
lbry.version = () => { return _request("version") }

// Generate a new wallet address
//
// Args:
//     None
// Returns:
//     (str) New wallet address in base58
lbry.wallet_new_address = () => { return _request("wallet_new_address") }

// Return the balance of the wallet
//
// Returns:
//     (float) amount of lbry credits in wallet
lbry.wallet_balance = () => { return _request("wallet_balance") }

// List transactions belonging to wallet
//
// Args:
//     None
// Returns:
//     (list) List of transactions
lbry.transaction_list = () => { return _request("transaction_list") }

// Get daemon settings
//
// Args:
//     None
// Returns:
//     (dict) Dictionary of daemon settings
//     {
//         'run_on_startup': (bool) currently not supported
//         'data_rate': (float) data rate
//         'max_key_fee': (float) maximum key fee
//         'download_directory': (str) path of where files are downloaded
//         'max_upload': (float), currently not supported
//         'max_download': (float), currently not supported
//         'download_timeout': (int) download timeout in seconds
//         'max_search_results': (int) max search results
//         'wallet_type': (str) wallet type
//         'delete_blobs_on_remove': (bool) delete blobs on removal
//         'peer_port': (int) peer port
//         'dht_node_port': (int) dht node port
//         'use_upnp': (bool) use upnp if true
//     }
lbry.settings_get = () => { return _request("settings_get") }

// Return daemon status
//
// Args:
//     'session_status' (optional): (bool) true to return session status,
//         default is false
// Returns:
//     (dict) Daemon status dictionary
lbry.status = () => { return _request("status") }

// Return a list of available commands
//
// Returns:
//     (list) list of available commands
lbry.commands = () => { return _request("commands") }

// Stop lbrynet-daemon
//
// Returns:
//     (string) Shutdown message
lbry.daemon_stop = () => { return _request("daemon_stop") }


// List my name claims
//
// Args:
//     None
// Returns
//     (list) List of name claims owned by user
//     [
//         {
//             'address': (str) address that owns the claim
//             'amount': (float) amount assigned to the claim
//             'blocks_to_expiration': (int) number of blocks until it expires
//             'category': (str) "claim", "update" , or "support"
//             'claim_id': (str) claim ID of the claim
//             'confirmations': (int) number of blocks of confirmations for the claim
//             'expiration_height': (int) the block height which the claim will expire
//             'expired': (bool) true if expired, false otherwise
//             'height': (int) height of the block containing the claim
//             'is_spent': (bool) true if claim is abandoned, false otherwise
//             'name': (str) name of the claim
//             'txid': (str) txid of the cliam
//             'nout': (int) nout of the claim
//             'value': (str) value of the claim
//         },
//    ]
lbry.claim_list_mine = () => { return _request("claim_list_mine") }

// Reflects all saved blobs
//
// Args:
//     None
// Returns:
//     (bool) true if successful
lbry.blob_reflect_all = () => { return _request("blob_reflect_all") }

// Announce all blobs to the DHT
//
// Args:
//     None
// Returns:
//     (str) Success/fail message
lbry.blob_announce_all = () => { return _request("blob_announce_all") }

// Delete a blob
//
// Args:
//     'blob_hash': (str) hash of blob to get
// Returns:
//     (str) Success/fail message
lbry.blob_delete = (blob_hash) => {
  const params =  {
    blob_hash: blob_hash
  }
  return _request("blob_delete", params)
}

// Download and return a blob
//
// Args:
//     'blob_hash': (str) blob hash of blob to get
//     'timeout'(optional): (int) timeout in number of seconds
//     'encoding'(optional): (str) by default no attempt at decoding is made,
//                          can be set to one of the following decoders:
//                          'json'
//     'payment_rate_manager'(optional): if not given the default payment rate manager
//                                      will be used. supported alternative rate managers:
//                                      'only-free'
//
// Returns
//     (str) Success/Fail message or (dict) decoded data
lbry.blob_get = (blob_hash, optional_paramaters) => {
  const params =  {
    blob_hash: blob_hash,
    optional_paramaters
  }
  return _request("blob_get", params)
}


// Returns blob hashes. If not given filters, returns all blobs known by the blob manager
//
// Args:
//     'uri' (optional): (str) filter by blobs in stream for winning claim
//     'stream_hash' (optional): (str) filter by blobs in given stream hash
//     'sd_hash' (optional): (str) filter by blobs in given sd hash
//     'needed' (optional): (bool) only return needed blobs
//     'finished' (optional): (bool) only return finished blobs
//     'page_size' (optional): (int) limit number of results returned
//     'page' (optional): (int) filter to page x of [page_size] results
// Returns:
//     (list) List of blob hashes
lbry.blob_list = (optional_paramaters) => {
  const params =  optional_paramaters
  return _request("blob_announce_all", params)
}


// Get contents of a block
//
// Args:
//     'blockhash': (str) hash of the block to look up
// Returns:
//     (dict) Requested block
lbry.block_show = (blockhash) => {
  const params =  {
    blockhash: blockhash
  }
  return _request("block_show", params)
}

// Abandon a name and reclaim credits from the claim
//
// Args:
//     'txid': (str) txid of claim
//     'nout': (int) nout of claim
// Return:
//     (dict) Dictionary containing result of the claim
//     {
//         txid : (str) txid of resulting transaction
//         fee : (float) fee paid for the transaction
//     }
lbry.claim_abandon = (txid, nout) => {
  const params =  {
    txid: txid,
    nout: nout
  }
  return _request("claim_abandon", params)
}

// Get claims for a name
//
// Args:
//     'name': (str) search for claims on this name
// Returns
//     (dict) State of claims assigned for the name
//     {
//         'claims': (list) list of claims for the name
//         [
//             {
//             'amount': (float) amount assigned to the claim
//             'effective_amount': (float) total amount assigned to the claim,
//                                 including supports
//             'claim_id': (str) claim ID of the claim
//             'height': (int) height of block containing the claim
//             'txid': (str) txid of the claim
//             'nout': (int) nout of the claim
//             'supports': (list) a list of supports attached to the claim
//             'value': (str) the value of the claim
//             },
//         ]
//         'supports_without_claims': (list) supports without any claims attached to them
//         'last_takeover_height': (int) the height of last takeover for the name
//     }
lbry.claim_list = (name) => {
  const params =  {
    name: name
  }
  return _request("claim_list", params)
}

// Support a name claim
//
// Args:
//     'name': (str) name
//     'claim_id': (str) claim ID of claim to support
//     'amount': (float) amount to support by
// Return:
//     (dict) Dictionary containing result of the claim
//     {
//         txid : (str) txid of resulting support claim
//         nout : (int) nout of the resulting support claim
//         fee : (float) fee paid for the transaction
//     }
lbry.claim_new_support = (name, claim_id, amount) => {
  const params =  {
    name: name,
    claim_id: claim_id,
    amount: amount
  }
  return _request("claim_new_support", params)
}

// Resolve claim info from a LBRY name
//
// Args:
//     'name': (str) name to look up, do not include lbry:// prefix
//     'txid'(optional): (str) if specified, look for claim with this txid
//     'nout'(optional): (int) if specified, look for claim with this nout
// Returns:
//     (dict) Dictionary contaning claim info, (bool) false if claim is not
//         resolvable
//
//     {
//         'txid': (str) txid of claim
//         'nout': (int) nout of claim
//         'amount': (float) amount of claim
//         'value': (str) value of claim
//         'height' : (int) height of claim takeover
//         'claim_id': (str) claim ID of claim
//         'supports': (list) list of supports associated with claim
//     }
lbry.claim_show = (name, optional_paramaters) => {
  const params = {
    name: name,
    optional_paramaters
  }
  return _request("claim_show", params)
}

// Download and return a sd blob
//
// Args:
//     'sd_hash': (str) hash of sd blob
//     'timeout'(optional): (int) timeout in number of seconds
//     'payment_rate_manager'(optional): (str) if not given the default payment rate manager
//                                      will be used. supported alternative rate managers:
//                                      only-free
//
// Returns
//     (str) Success/Fail message or (dict) decoded data
lbry.descriptor_get = (sd_hash, optional_paramaters) => {
  const params =  {
    sd_hash: sd_hash,
    optional_paramaters
  }
  return _request("descriptor_get", params)
}

// Delete a lbry file
//
// Args:
//     'name' (optional): (str) delete file by lbry name,
//     'sd_hash' (optional): (str) delete file by sd hash,
//     'file_name' (optional): (str) delete file by the name in the downloads folder,
//     'stream_hash' (optional): (str) delete file by stream hash,
//     'claim_id' (optional): (str) delete file by claim ID,
//     'outpoint' (optional): (str) delete file by claim outpoint,
//     'rowid': (optional): (int) delete file by rowid in the file manager
//     'delete_target_file' (optional): (bool) delete file from downloads folder,
//                                     defaults to true if false only the blobs and
//                                     db entries will be deleted
// Returns:
//     (bool) true if deletion was successful
lbry.file_delete = (optional_paramaters) => _request("file_delete", optional_paramaters)


// List files limited by optional filters
//
// Args:
//     'name' (optional): (str) filter files by lbry name,
//     'sd_hash' (optional): (str) filter files by sd hash,
//     'file_name' (optional): (str) filter files by the name in the downloads folder,
//     'stream_hash' (optional): (str) filter files by stream hash,
//     'claim_id' (optional): (str) filter files by claim id,
//     'outpoint' (optional): (str) filter files by claim outpoint,
//     'rowid' (optional): (int) filter files by internal row id,
//     'full_status': (optional): (bool) if true populate the 'message' and 'size' fields
//
// Returns:
//     (list) List of files
//
//     [
//         {
//             'completed': (bool) true if download is completed,
//             'file_name': (str) name of file,
//             'download_directory': (str) download directory,
//             'points_paid': (float) credit paid to download file,
//             'stopped': (bool) true if download is stopped,
//             'stream_hash': (str) stream hash of file,
//             'stream_name': (str) stream name ,
//             'suggested_file_name': (str) suggested file name,
//             'sd_hash': (str) sd hash of file,
//             'name': (str) name claim attached to file
//             'outpoint': (str) claim outpoint attached to file
//             'claim_id': (str) claim ID attached to file,
//             'download_path': (str) download path of file,
//             'mime_type': (str) mime type of file,
//             'key': (str) key attached to file,
//             'total_bytes': (int) file size in bytes, None if full_status is false
//             'written_bytes': (int) written size in bytes
//             'message': (str), None if full_status is false
//             'metadata': (dict) Metadata dictionary
//         },
//     ]
lbry.file_list = (optional_paramaters) => {
  return _request("file_list", optional_paramaters)
}


// Start or stop seeding a file
//
// Args:
//     'status': (str) "start" or "stop"
//     'name' (optional): (str) start file by lbry name,
//     'sd_hash' (optional): (str) start file by the hash in the name claim,
//     'file_name' (optional): (str) start file by its name in the downloads folder,
// Returns:
//     (str) Confirmation message
lbry.file_seed = (status, optional_paramaters) => {
  const params =  {
    status: status,
    optional_paramaters
  }
  return _request("file_seed", params)
}

// Download stream from a LBRY name.
//
// Args:
//     'name': (str) name to download
//     'file_name'(optional): (str) a user specified name for the downloaded file
//     'stream_info'(optional): (str) specified stream info overrides name
//     'timeout'(optional): (int) download timeout in number of seconds
//     'download_directory'(optional): (str) path to directory where file will be saved
//     'wait_for_write'(optional): (bool)  defaults to True. When set, waits for the file to
//         only start to be written before returning any results.
// Returns:
//     (dict) Dictionary contaning information about the stream
//
//     {
//         'completed': (bool) true if download is completed,
//         'file_name': (str) name of file,
//         'download_directory': (str) download directory,
//         'points_paid': (float) credit paid to download file,
//         'stopped': (bool) true if download is stopped,
//         'stream_hash': (str) stream hash of file,
//         'stream_name': (str) stream name ,
//         'suggested_file_name': (str) suggested file name,
//         'sd_hash': (str) sd hash of file,
//         'name': (str) name claim attached to file
//         'outpoint': (str) claim outpoint attached to file
//         'claim_id': (str) claim ID attached to file,
//         'download_path': (str) download path of file,
//         'mime_type': (str) mime type of file,
//         'key': (str) key attached to file,
//         'total_bytes': (int) file size in bytes, None if full_status is false
//         'written_bytes': (int) written size in bytes
//         'message': (str), None if full_status is false
//         'metadata': (dict) Metadata dictionary
//     }
lbry.get = (name, optional_paramaters) => {
  const params =  {
    name: name,
    optional_paramaters
  }
  return _request("get", params)
}

// Get stream availability for a winning claim
//
// Args:
//     'name' : (str) lbry name
//     'sd_timeout' (optional): (int) sd blob download timeout
//     'peer_timeout' (optional): (int) how long to look for peers
//
// Returns:
//     (float) Peers per blob / total blobs
lbry.get_availability = (name, optional_paramaters) => {
  const params =  {
    name: name,
    optional_paramaters
  }
  return _request("get_availability", params)
}

// Get peers for blob hash
//
// Args:
//     'blob_hash': (str) blob hash
//     'timeout'(optional): (int) peer search timeout in seconds
// Returns:
//     (list) List of contacts
lbry.peer_list = (blob_hash, optional_paramaters) => {
  const params =  {
    blob_hash: blob_hash,
    optional_paramaters
  }
  return _request("peer_list", params)
}

// Make a new name claim and publish associated data to lbrynet
//
// Args:
//     'name': (str) name to be claimed, string
//     'bid': (float) amount of credits to commit in this claim,
//     'metadata': (dict) Metadata compliant (can be missing sources if a file is provided)
//     'file_path' (optional): (str) path to file to be associated with name, if not given
//                             the stream from your existing claim for the name will be used
//     'fee' (optional): (dict) FeeValidator compliant (i.e. {'LBC':{'amount':10}} )
// Returns:
//     (dict) Dictionary containing result of the claim
//     {
//         'tx' : (str) hex encoded transaction
//         'txid' : (str) txid of resulting claim
//         'nout' : (int) nout of the resulting claim
//         'fee' : (float) fee paid for the claim transaction
//         'claim_id' : (str) claim ID of the resulting claim
//     }
lbry.publish = (name, bid, metadata, optional_paramaters) => {
  const params =  {
    name: name,
    bid: bid,
    metadata: metadata,
    optional_paramaters
  }
  return _request("publish", params)
}

// Reflect a stream
//
// Args:
//     'sd_hash': (str) sd_hash of lbry file
// Returns:
//     (bool) true if successful
lbry.reflect = (sd_hash) => {
  const params =  {
    sd_hash: sd_hash
  }
  return _request("reflect", params)
}

// Report a bug to slack
//
// Args:
//     'message': (str) message to send
// Returns:
//     (bool) true if successful
lbry.report_bug = (message) => {
  const params =  {
    message: message
  }
  return _request("report_bug", params)
}

// Send credits to an address
//
// Args:
//     'amount': (float) the amount to send
//     'address': (str) the address of the recipient in base58
// Returns:
//     (bool) true if payment successfully scheduled
lbry.send_amount_to_address = (amount, address) => {
  const params =  {
    amount: amount,
    address: address
  }
  return _request("send_amount_to_address", params)
}

// Set daemon settings
//
// Args:
//     'run_on_startup': (bool) currently not supported
//     'data_rate': (float) data rate,
//     'max_key_fee': (float) maximum key fee,
//     'download_directory': (str) path of where files are downloaded,
//     'max_upload': (float), currently not supported
//     'max_download': (float), currently not supported
//     'download_timeout': (int) download timeout in seconds
// Returns:
//     (dict) settings dict
lbry.settings_set = (data_rate, max_key_fee, download_directory, download_timeout) => {
  const params =  {
    data_rate: data_rate,
    max_key_fee: max_key_fee,
    download_directory: download_directory,
    download_timeout: download_timeout
  }
  return _request("blob_announce_all", params)
}

// Get estimated cost for a lbry stream
//
// Args:
//     'name': (str) lbry name
//     'size' (optional): (int) stream size, in bytes. if provided an sd blob
//                         won't be downloaded.
// Returns:
//     (float) Estimated cost in lbry credits
lbry.stream_cost_estimate = (name, optional_paramaters) => {
  const params =  {
    name: name,
    optional_paramaters
  }
  return _request("stream_cost_estimate", params)
}

// Get a decoded transaction from a txid
//
// Args:
//     'txid': (str) txid of transaction
// Returns:
//     (dict) JSON formatted transaction
lbry.transaction_show = (txid) => {
  const params =  {
    txid: txid
  }
  return _request("transaction_show", params)
}

// Checks if an address is associated with the current wallet.
//
// Args:
//     'address': (str) address to check in base58
// Returns:
//     (bool) true, if address is associated with current wallet
lbry.wallet_is_address_mine = (address) => {
  const params =  {
    address: address
  }
  return _request("wallet_is_address_mine", params)
}

// Get public key from wallet address
//
// Args:
//     'wallet': (str) wallet address in base58
// Returns:
//     (str) Public key in hex encoding
lbry.wallet_public_key = (wallet) => {
  const params =  {
    wallet: wallet
  }
  return _request("wallet_public_key", params)
}

module.exports = lbry
