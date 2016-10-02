const express = require('express');
const config = require('./backend/config/config');

const app = express();

require('./backend/config/express')(app, config);

app.listen(config.port, function () {
  	console.log('Express server listening on port ' + config.port);
});
