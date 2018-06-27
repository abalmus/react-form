"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KNOWN_BEHAVIORS = [
    'hideIf',
    'showIf',
    'disableIf'
];
var equalityCheck = function (equal, oneOf) { return function (value, formState) {
    if (equal) {
        return formState[value] === equal;
    }
    return oneOf.indexOf(formState[value]) !== -1;
}; };
exports.behaviorDetector = function (props) {
    var equals = props.equals, formState = props.formState, oneOf = props.oneOf;
    var behaviorsToApply = {};
    var equality = equalityCheck(equals, oneOf);
    KNOWN_BEHAVIORS
        .filter(function (behavior) { return props[behavior]; })
        .map(function (behavior) {
        behaviorsToApply[behavior] = equality(props[behavior], formState);
    });
    return behaviorsToApply;
};
