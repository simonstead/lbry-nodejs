# lbry-nodejs

## A nodejs RPC wrapper for LBRY protocol

### To get started:

#### 1) Download the lbrynet-daemon:
```bash
$ ./lbrynet-daemon
```

#### 2) Require the module in your nodejs package
```javascript
const lbry = require('lbry-nodejs')
```

#### 3) Use a method

```javascript
lbry.get('name')
.then((data) => console.log(data))
.catch((error) => console.error(error))
```

## List of methods

### Get

#### Inputs
```javascript
const name = 'TEST_NAME'
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
