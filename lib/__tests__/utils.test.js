"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var errors_1 = require("../Form/utils/errors");
var errorsSet = [
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
describe('React utils', function () {
    it('should normalize errors', function () {
        var fieldName = 'field2';
        var state = { errors: [{ field1: [{ minlength: 'Insert minlength' }] }] };
        var normalizedErrors = errors_1.normalizeErrors(state, errorsSet, fieldName).errors;
        chai_1.expect(normalizedErrors.length).to.equals(2);
    });
});
//# sourceMappingURL=utils.test.js.map