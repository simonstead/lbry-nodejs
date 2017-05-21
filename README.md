# lbry-nodejs

## A nodejs RPC wrapper for LBRY protocol

---

 **Donate LBRY credits**

 > bUgP1zxWitRBcz4kJdGzgsNoFQU4H71yYu

 **Donate Bitcoin**

 > 1GXHUyUaMu8RnmHqApz3CuLAbGhcxbqGjT

---

### To get started:

#### 1) Download the and run the lbrynet-daemon:
```bash
$ ./lbrynet-daemon
```

Or download the app, and open it.

#### 2) Require the module in your application
```javascript
const lbry = require('lbry-nodejs')
```

#### 3) Use a method

```javascript
lbry.get('name')
.then((data) => console.log(data))
.catch((error) => console.error(error))
```


# Example

### Method with required parameters

### `resolve_name`

#### Inputs
```javascript
const name = 'itsadisaster'
```

##### Method
```javascript
lbry.resolve_name(name)
```

##### Response
```javascript
const response = {
  "id": null,
  "jsonrpc": "2.0",
  "result": {
    "author": "Written and directed by Todd Berger",
    "content_type": "video/mp4",
    "description": "Four couples meet for Sunday brunch only to discover they are stuck in a house together as the world may be about to end.",
    "fee": {
      "USD": {
        "address": "bX4sH7PbLLfwiMfm5HJKAmzdhoQK3pSuSU",
        "amount": 5.0
      }
    },
    "language": "en",
    "license": "Oscilloscope Laboratories",
    "nsfw": false,
    "sources": {
      "lbry_sd_hash": "8e877083818a51734b2722e7f53b3352255feca8c38be619471ef1af730b272f295ff1a774cf28f71dfad7b3a249e747"
    },
    "thumbnail": "http://ia.media-imdb.com/images/M/MV5BMTQwNjYzMTQ0Ml5BMl5BanBnXkFtZTcwNDUzODM5Nw@@._V1_SY1000_CR0,0,673,1000_AL_.jpg",
    "title": "It's a Disaster",
    "ver": "0.0.3"
  }
}
```


### Method with optional parameters:
### `peer_list`

#### Inputs
```javascript
const blob_hash = 'some_blob_hash'
const optional_paramaters = { timeout: 60 }
```

##### Method
```javascript
lbry.peer_list(blob_hash, optional_paramaters)
```

##### Response
```javascript
const response = {
  "id": null,
  "jsonrpc": "2.0",
  "result": {

  }
}
```



### Currently available methods
:ballot_box_with_check: blob_announce_all

:ballot_box_with_check: blob_reflect_all

:ballot_box_with_check: claim_list_mine

:ballot_box_with_check: channel_list_mine

:ballot_box_with_check: channel_new

:ballot_box_with_check: daemon_stop

:ballot_box_with_check: status

:ballot_box_with_check: settings_get

:ballot_box_with_check: transaction_list

:ballot_box_with_check: wallet_new_address

:ballot_box_with_check: version

:ballot_box_with_check: help

:ballot_box_with_check: resolve_name

:ballot_box_with_check: blob_delete

:ballot_box_with_check: blob_get

:ballot_box_with_check: blob_list

:ballot_box_with_check: block_show

:ballot_box_with_check: claim_abandon

:ballot_box_with_check: claim_list

:ballot_box_with_check: claim_new_support

:ballot_box_with_check: claim_show

:ballot_box_with_check: descriptor_get

:ballot_box_with_check: file_list

:ballot_box_with_check: file_seed

:ballot_box_with_check: get

:ballot_box_with_check: get_availability

:ballot_box_with_check: peer_list

:ballot_box_with_check: publish

:ballot_box_with_check: reflect

:ballot_box_with_check: report_bug

:ballot_box_with_check: send_amount_to_address

:ballot_box_with_check: settings_set

:ballot_box_with_check: stream_cost_estimate

:ballot_box_with_check: transaction_show

:ballot_box_with_check: wallet_is_address_mine

:ballot_box_with_check: wallet_public_key
