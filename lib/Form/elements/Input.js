"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
exports.Input = function (props) {
    var classList = [
        (props.changed ? 'changed' : ''),
        (props.clicked ? 'clicked' : ''),
        (props.dirty ? 'dirty' : ''),
    ];
    var handleOnBlur = props.handleOnBlur, handleOnChange = props.handleOnChange, handleOnClick = props.handleOnClick, label = props.label, name = props.name, placeholder = props.placeholder, type = props.type, value = props.value, disabled = props.disabled;
    return (React.createElement("div", { className: type + "-field " + classList.join(' ') },
        React.createElement("label", null,
            React.createElement("span", null, label),
            React.createElement("input", { type: type, onClick: handleOnClick, onChange: handleOnChange, onBlur: handleOnBlur, name: name, value: value, placeholder: placeholder, disabled: disabled }))));
};
