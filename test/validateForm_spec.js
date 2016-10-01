import {expect} from 'chai';
import validate, {REQUIRED} from '../client/validateForm';

describe('validateForm', () => {
    it('requires title to be set', () => {
        const values = {};
        const errors = validate(values);
        expect(errors.title).to.equal(REQUIRED);
    });
    it('requires description to be set', () => {
        const values = {};
        const errors = validate(values);
        expect(errors.description).to.equal(REQUIRED);
    });
    it('requires location to be set', () => {
        const values = {};
        const errors = validate(values);
        expect(errors.location).to.equal(REQUIRED);
    });
    it('requires start_time to be set', () => {
        const values = {};
        const errors = validate(values);
        expect(errors.start_time).to.equal(REQUIRED);
    });
    it('requires end_time to be set', () => {
        const values = {};
        const errors = validate(values);
        expect(errors.end_time).to.equal(REQUIRED);
    });
    it('requires groups to be set', () => {
        const values = {};
        const errors = validate(values);
        expect(errors.groups).to.equal(REQUIRED);
    });
    it('requires contact_person to be set', () => {
        const values = {};
        const errors = validate(values);
        expect(errors.contact_person).to.equal(REQUIRED);
    });
});
