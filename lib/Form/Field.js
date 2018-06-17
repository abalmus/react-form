"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var index_1 = require("./elements/index");
var ErrorContainer_1 = require("./ErrorContainer");
var elements = {
    checkbox: index_1.Input,
    color: index_1.Input,
    email: index_1.Input,
    number: index_1.Input,
    select: index_1.Select,
    submit: index_1.Input,
    tel: index_1.Input,
    text: index_1.Input,
    textarea: index_1.TextArea,
};
var FormField;
(function (FormField) {
    ;
})(FormField = exports.FormField || (exports.FormField = {}));
var Field = /** @class */ (function (_super) {
    __extends(Field, _super);
    function Field() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            changed: false,
            clicked: false,
            dirty: false,
            errors: [],
            value: _this.props.value || '',
        };
        return _this;
    }
    Field.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.errors !== this.state.errors) {
            this.setState({
                errors: nextProps.errors,
            });
        }
    };
    Field.prototype.handleOnBlur = function (event, name) {
        this.setState(function (prevState, props) { return ({
            dirty: true,
        }); });
        this.props.handleOnBlur(event, name);
    };
    Field.prototype.handleOnChange = function (event, name) {
        event.persist();
        this.setState(function (prevState, props) { return ({
            changed: true,
            value: event.target.value,
        }); });
        this.props.handleOnChange(event, name);
    };
    Field.prototype.handleOnClick = function (event, name) {
        this.setState(function (prevState, props) { return ({
            clicked: true,
        }); });
        this.props.handleOnClick(event, name);
    };
    Field.prototype.render = function () {
        var _this = this;
        var _a = this.state, errors = _a.errors, value = _a.value;
        var component = getComponent(this.props.type, __assign({}, this.props, { changed: this.state.changed, clicked: this.state.clicked, dirty: this.state.dirty, handleOnBlur: function (event) { return _this.handleOnBlur(event, _this.props.name); }, handleOnChange: function (event) { return _this.handleOnChange(event, _this.props.name); }, handleOnClick: function (event) { return _this.handleOnClick(event, _this.props.name); }, value: value }));
        return (React.createElement(ErrorContainer_1.default, { errors: errors }, component));
    };
    return Field;
}(React.Component));
exports.Field = Field;
function getComponent(type, props) {
    if (typeof elements[type] === 'undefined') {
        console.error('Field type: ' + type + ' doesn\'t exist');
        return null;
    }
    var element = elements[type](props);
    return React.isValidElement(element) ? element : null;
}
