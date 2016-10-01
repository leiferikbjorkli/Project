import $ from 'jquery';
import dateUtils from './date';
import '../../../node_modules/pickadate/lib/picker.date.js';
import '../../../node_modules/pickadate/lib/picker.time.js';

export function initPickadateLocaleGlobally() {
    $.extend($.fn.pickadate.defaults, {
        monthsFull: ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember'],
        monthsShort: ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'],
        weekdaysFull: ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'],
        weekdaysShort: ['søn', 'man', 'tir', 'ons', 'tor', 'fre', 'lør'],
        today: 'I dag',
        clear: 'Nullstill',
        firstDay: 1,
        format: 'd. mmmm yyyy'
    });
}

export function initDatePicker(el, isoDateStr) {
    var $el = $(el).pickadate({
        formatSubmit: 'yyyy-mm-dd',
        hiddenPrefix: 'hidden_',
        hiddenSuffix: '_iso'
    });
    if (isoDateStr) {
        $el.pickadate('picker').set('select', isoDateStr, {format: 'yyyy-mm-dd'});
    }
}

export function initTimePicker(el, isoTimeStr) {
    var $el = $(el).pickatime({
        format: 'HH:i',
        formatSubmit: 'HH:i:00',
        hiddenPrefix: 'hidden_',
        hiddenSuffix: '_iso'
    });
    if (isoTimeStr) {
        $el.pickatime('picker').set('select', isoTimeStr, {format: 'HH:i'});
    }
}
