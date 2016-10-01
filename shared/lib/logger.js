var Bunyan = require('bunyan');

var name = 'kompetanse';

module.exports = Bunyan.createLogger({
    name: name,
    serializers: Bunyan.stdSerializers
});