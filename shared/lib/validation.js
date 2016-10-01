var _ = require("lodash");
var lang = require('./message/language').getTemplates();

var validators = {
    required: {
        validator: function (attribute) {
            return !_.isEmpty(attribute)
        },
        message: lang.validation_required
    },
    isoDate: {
        validator: function (attribute) {
            if (attribute) {
                var re = /^(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})$/
                return re.test(attribute);
            }
            return true;
        },
        message: lang.validation_iso_date
    },
    greaterThan: {
        validator: function (attribute, options) {
            if (attribute) {
                return attribute > options.data[options.field];
            }
            return true;
        },
        message: lang.validation_greater_than
    }
};

var validation = function (data, validations) {
    var validatorModule, errors = {};

    if (data === undefined) {
        throw new Error("No data provided");
    }

    _.each(validations, function (fieldValue, fieldName) {
        _.each(fieldValue, function (validationOptions, validationKey) {
            validationOptions = _.extend(validationOptions, {
                data: data
            });
            validatorModule = validators[validationKey];
            fieldValue = data[fieldName];
            if (!validatorModule.validator(fieldValue, validationOptions)) {
                errors[fieldName] = errors[fieldName] || [];
                errors[fieldName].push(validatorModule.message);
            }
        });
    });

    if (!_.isEmpty(errors)) {
        return errors;
    }
};

module.exports = validation;
