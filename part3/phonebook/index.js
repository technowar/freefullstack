const express = require('express')
const app = express()

require('./config/express')(app);
require('./config/routes')(app);

app.listen(3000, () => console.log('Server running on port 3000'));
