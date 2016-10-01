var util = require('util');

var GeneralError = function (msg, constr) {
    Error.captureStackTrace(this, constr || this);

    this.message = msg;
};
util.inherits(GeneralError, Error);
GeneralError.prototype.name = 'AbstractError';

var NotFoundError = function (msg) {
    NotFoundError.super_.call(this, msg, this.constructor);
};

util.inherits(NotFoundError, GeneralError);
NotFoundError.prototype.name = 'NotFoundError';

var ValidationError = function (msg) {
    ValidationError.super_.call(this, msg, this.constructor);
};

util.inherits(ValidationError, GeneralError);
ValidationError.prototype.name = 'ValidationError';

module.exports = {
    NotFoundError: NotFoundError,
    GeneralError: GeneralError,
    ValidationError: ValidationError
};