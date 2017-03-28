const lbry = require('./lbry');
lbry.resolve_name('itsadisaster')
.then((response) => console.log(response))
.catch((error) => console.error(error))
