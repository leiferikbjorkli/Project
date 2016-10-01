var _ = require('lodash');
var lang = require('../lib/message/language').getTemplates();
var marked = require('marked');

module.exports = function (response, options) {
    var helpers = options.helpers || {};

    helpers = _.extend(helpers, {
        marked: function (content) {
            return marked((content || '').trim());
        }
    });

    options.helpers = helpers;
    options.lang = lang;

    response.render('../../shared/views/layout', options);
};
