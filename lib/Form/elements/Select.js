"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var lodash_1 = require("lodash");
exports.Select = function (props) {
    var name = props.name, label = props.label, placeholder = props.placeholder, handleOnClick = props.handleOnClick, handleOnChange = props.handleOnChange, handleOnBlur = props.handleOnBlur, options = props.options, value = props.value;
    var classList = [
        (props.changed ? 'changed' : ''),
        (props.clicked ? 'clicked' : ''),
        (props.dirty ? 'dirty' : ''),
    ];
    var defaultOption = getDefaultOption(placeholder) || '';
    return React.createElement("div", { className: classList.join(' ') },
        React.createElement("label", null,
            " ",
            label,
            React.createElement("select", { id: name, name: name, onClick: handleOnClick, onChange: handleOnChange, onBlur: handleOnBlur, value: value },
                defaultOption,
                adaptOptions(options).map(function (option) {
                    return React.createElement("option", { key: option.value.toLowerCase(), value: option.value }, option.label);
                }))));
};
function getDefaultOption(placeholder) {
    var option;
    if (placeholder) {
        if (placeholder) {
            option = React.createElement("option", null, placeholder);
        }
    }
    return option;
}
;
function adaptOptions(options) {
    if (lodash_1.isString(options)) {
        return adaptStringValue(options);
    }
    if (lodash_1.isArray(options)) {
        return adaptArrayValue(options);
    }
    if (lodash_1.isPlainObject(options)) {
        return adaptObjectValue(options);
    }
    return [];
}
;
function adaptStringValue(options) {
    var optionsAfterSplit = options.split(',');
    return lodash_1.map(optionsAfterSplit, function (option) { return ({
        label: option.trim().toLowerCase(),
        value: option.trim(),
    }); });
}
function adaptArrayValue(options) {
    return lodash_1.map(options, function (option) {
        return (lodash_1.isString(option) ? adaptStringValue(option)[0] : adaptObjectValue(option));
    });
}
function adaptObjectValue(options) {
    return options;
}
