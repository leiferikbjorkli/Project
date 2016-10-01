var nb = require('./lang/nb');

var currentLang = 'nb';

module.exports = {
    getTemplates: function () {

        if (currentLang === 'nb') {
            return nb;
        }

    },
    setLang: function (lang) {
        currentLang = lang;
    }
};