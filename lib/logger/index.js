const winston = require('winston');

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)()
    ]
});

logger.info('logger configured to log to the console only.');

module.exports = logger;
