import { expect } from 'chai';
import { normalizeErrors } from '../Form/utils/errors';

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
})
