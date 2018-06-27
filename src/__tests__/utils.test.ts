import { expect } from 'chai';
import { normalizeErrors } from '../Form/utils/errors';
import { behaviorDetector } from '../Form/utils/behaviors';

import 'mocha';

const errorsSet = [
    {
        field1: [
            { required: 'Field is required' },
            { minlength: 'Please enter minlength' },
            { maxlength: 'Please enter maxlength' }
        ]
    },
    {
        field2: [
            { required: 'Field is required' },
            { minlength: 'Please enter minlength' },
            { pattern: 'Please enter a valid field format' }
        ]
    },
];

describe('React utils', () => {
    it('should normalize errors', () => {
        const fieldName = 'field2';
        const state = {errors: [{field1: [{minlength: 'Insert minlength'}]}]};
        const normalizedErrors = normalizeErrors(state, errorsSet, fieldName).errors;

        expect(normalizedErrors.length).to.equals(2);
    });

    it('should return available behaviors', () => {
        expect(behaviorDetector({
            hideIf: 'name',
            equals: 'me',
            formState: { name: 'me' },
        })).deep.equals({ hideIf: true });

        expect(behaviorDetector({
            hideIf: 'name',
            equals: 'me',
            formState: { name: 'not me' },
        })).deep.equals({ hideIf: false });

        expect(behaviorDetector({
            hideIf: 'name',
            oneOf: ['dude', 'me', 'buddy'],
            formState: { name: 'me' },
        })).deep.equals({ hideIf: true });
    });
});
