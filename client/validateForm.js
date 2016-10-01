export const REQUIRED = 'Påkrevd';
import _ from 'lodash';

export default function validate(values) {
    const errors = {};
    errors.title = values.title ? '' : REQUIRED;
    errors.description = values.description ? '' : REQUIRED;
    errors.location = values.location ? '' : REQUIRED;
    errors.start_time = values.start_time ? '' : REQUIRED;
    errors.end_time = values.end_time ? '' : REQUIRED;
    errors.groups = !_.isEmpty(values.groups) ? '' : REQUIRED;
    errors.contact_person = values.contact_person ? '' : REQUIRED;
    errors.tags = !_.isEmpty(values.tags) ? '' : REQUIRED;
    return errors;
}
