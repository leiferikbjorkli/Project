var _ = require('lodash');

function existsInArray(coll) {
    return function (value) {
        return _.contains(coll, value);
    }
}

function containsAll(coll, values) {
    return _.every(values, existsInArray(coll));
}

module.exports = {
    containsAll
};
