var env = process.env;
var config = {
    casCallbackUrl: process.env.CAS_CALLBACK_URL,
    port: process.env.PORT || 3000,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    producerIdEmployee: process.env.PRODUCER_ID_EMPLOYEE,
    producerIdPracticeGroups: process.env.PRODUCER_ID_PRACTICEGROUPS,
    producerIdEvents: process.env.PRODUCER_ID_EVENTS,
    autentiseringServiceUrl: process.env.AUTH_SERVICE_URL
};

module.exports = config;
