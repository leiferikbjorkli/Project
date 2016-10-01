var moment = require('moment');

function setTimeZoneAndFormatTime(date, time) {
    if (date === '' || time === '') {
        return;
    } else {
        return moment(date + 'T' + time).local();
    }
}

module.exports = {
    setTimeZoneAndFormatTime
};
