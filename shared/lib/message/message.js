var lang = require('./language');
var messageType = require('./message-type');
var util = require('util');

function parseArguments() {
    if (arguments.length !== 0) {
        this.message = util.format.apply(util, arguments);
    }
}

exports.ErrorMessage = function () {

    this.type = messageType.ERROR;
    this.message = lang.getTemplates().error_general;

    parseArguments.apply(this, arguments);

};

exports.InfoMessage = function () {

    this.type = messageType.INFO;
    this.message = '';

    parseArguments.apply(this, arguments);

};

exports.SuccessMessage = function () {

    this.type = messageType.SUCCESS;
    this.message = '';

    parseArguments.apply(this, arguments);

};