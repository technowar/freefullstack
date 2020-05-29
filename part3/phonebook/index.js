const express = require('express')
const app = express()

require('./config/express')(app);
require('./config/routes')(app);

app.listen(process.env.PORT || 3000, () => console.log('Server running'));
