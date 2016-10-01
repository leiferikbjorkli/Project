var bekkClient = require('bekk-client');
var config = require('../../shared/lib/config');

var eventClient = new bekkClient({
    konsumentId: config.clientId,
    konsumentSecret: config.clientSecret,
    produsentId: config.producerIdEvents,
    authUrl: config.autentiseringServiceUrl
});

exports.allTags = function (req, res) {

    eventClient.get('/v1/Tags')
        .then(function(result) {
            res.status(200).json(result)
        }).done();
};
