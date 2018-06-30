"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KNOWN_BEHAVIORS = [
    'hideIf',
    'showIf',
    'disableIf'
];
var EQUALITY_OPTIONS = [
    'equal',
    'oneOf',
    'notEmpty',
    'regex'
];
var equalityCheck = function (equals, oneOf, notEmpty, regex) { return function (value, formState) {
    if (equals) {
        return formState[value] === equals;
    }
    if (oneOf && oneOf instanceof Array) {
        return oneOf.indexOf(formState[value]) !== -1;
    }
    if (regex && regex instanceof RegExp) {
        return regex.test(formState[value]);
    }
    if (notEmpty) {
        return !!formState[value];
    }
    return false;
}; };
exports.behaviorDetector = function (props) {
    var equals = props.equals, formState = props.formState, oneOf = props.oneOf, notEmpty = props.notEmpty, regex = props.regex;
    var behaviorsToApply = {};
    var equality = equalityCheck(equals, oneOf, notEmpty, regex);
    KNOWN_BEHAVIORS
        .filter(function (behavior) { return props[behavior]; })
        .map(function (behavior) {
        behaviorsToApply[behavior] = (typeof props[behavior] === 'function') ?
            props[behavior](formState) :
            equality(props[behavior], formState);
    });
    return behaviorsToApply;
};
