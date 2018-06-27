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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var lodash_1 = require("lodash");
var prop_types_1 = require("prop-types");
var Field_1 = require("./Field");
var Submit_1 = require("./Submit");
var Behavior_1 = require("./Behavior");
var ValidationDecorator_1 = require("./ValidationDecorator");
var react_utils_1 = require("@tacitknowledge/react-utils");
/**
 * Form component with *Validation*.
 */
var Form = /** @class */ (function (_super) {
    __extends(Form, _super);
    function Form(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            processing: false,
            errors: [],
            formValid: false
        };
        _this.formState = {};
        _this.validateOn = '';
        _this.submitCtaProps = {};
        _this.validateOn = props.validateOn;
        _this.populateFormState(lodash_1.filter([].slice.call(props.children), function (child) { return child.type === Field_1.Field; }));
        _this.onSubmitHandler = _this.onSubmitHandler.bind(_this);
        _this.submitSuccess = _this.submitSuccess.bind(_this);
        _this.submitError = _this.submitError.bind(_this);
        return _this;
    }
    Form.prototype.shouldComponentUpdate = function (nextProps, nextStates) {
        return this.state.errors !== nextStates.errors
            || this.state.processing !== nextStates.processing;
    };
    Form.prototype.onFieldChangedHandler = function (event, fieldName) {
        var _this = this;
        this.formState[fieldName] = event.target.value;
        this.proofValidation('change', function () {
            _this.validateField(fieldName, event.target.value);
        });
        this.validateFormSilently(function (errors) {
            _this.setState({
                formValid: lodash_1.isEmpty(lodash_1.pickBy(errors, function (error) { return !lodash_1.isEmpty(error); }))
            });
        });
    };
    Form.prototype.onSubmitHandler = function (event) {
        var _this = this;
        var _a = this.props, ajax = _a.ajax, submitHandler = _a.submitHandler;
        event.preventDefault();
        this.setProcessing(true);
        this.proofValidation('submit', function () {
            _this.validateForm(function (errors) {
                if (errors.length) {
                    _this.setProcessing(false);
                    return false;
                }
                submitHandler({
                    ajax: Boolean(ajax),
                    formData: _this.formState
                }).then(_this.submitSuccess, _this.submitError)
                    .catch(_this.submitError);
            });
        });
    };
    Form.prototype.onFieldClickedHandler = function (event, fieldName) {
        var _this = this;
        this.proofValidation('click', function () {
            _this.validateField(fieldName, event.target.value);
        });
    };
    Form.prototype.onFieldBlurHandler = function (event, fieldName) {
        var _this = this;
        this.proofValidation('blur', function () {
            _this.validateField(fieldName, event.target.value);
        });
    };
    Form.prototype.render = function () {
        var _a = this.props, action = _a.action, method = _a.method;
        return (React.createElement("form", { action: action, method: method, onSubmit: this.onSubmitHandler }, this.renderChildren(this.props, this.state, {
            handleOnBlur: this.onFieldBlurHandler.bind(this),
            handleOnChange: this.onFieldChangedHandler.bind(this),
            handleOnClick: this.onFieldClickedHandler.bind(this),
        })));
    };
    Form.prototype.populateFormState = function (children) {
        var _this = this;
        if (lodash_1.isEmpty(this.formState)) {
            return lodash_1.map(children, function (child) {
                _this.formState[child.props.name] = child.props.value;
            });
        }
    };
    Form.prototype.submitSuccess = function (payload) {
        var submitSuccess = this.props.submitSuccess;
        this.setProcessing(false);
        if (typeof submitSuccess === 'function') {
            submitSuccess(payload);
        }
    };
    Form.prototype.submitError = function (error) {
        var submitError = this.props.submitError;
        this.setProcessing(false);
        if (typeof submitError === 'function') {
            submitError(error);
        }
    };
    Form.prototype.setProcessing = function (processing) {
        if (processing === void 0) { processing = false; }
        this.setState({ processing: processing });
    };
    Form.prototype.proofValidation = function (handleType, validate) {
        return this.validateOn.indexOf(handleType) !== -1 ?
            validate() :
            null;
    };
    Form.prototype.extractErrors = function (errors, child) {
        var result = errors.filter(function (error) { return lodash_1.keys(error).indexOf(child.props.name) !== -1; });
        return lodash_1.first(result) ? lodash_1.first(result)[child.props.name] : [];
    };
    Form.prototype.renderChildren = function (formProps, formState, childProps) {
        var _this = this;
        var handleOnBlur = childProps.handleOnBlur, handleOnChange = childProps.handleOnChange, handleOnClick = childProps.handleOnClick;
        var errors = formState.errors, formValid = formState.formValid, processing = formState.processing;
        return react_utils_1.Children.deepMap(formProps.children, function (child) {
            switch (child.type) {
                case Field_1.Field:
                    return React.cloneElement(child, {
                        errors: _this.extractErrors(errors, child),
                        handleOnBlur: handleOnBlur,
                        handleOnChange: handleOnChange,
                        handleOnClick: handleOnClick,
                    });
                case Submit_1.Submit:
                    return React.cloneElement(child, {
                        disableCondition: !formValid,
                        processing: processing
                    });
                case Behavior_1.Behavior:
                    return React.cloneElement(child, {
                        processing: processing,
                        formValid: formValid,
                        formState: _this.formState
                    });
                default:
                    return child;
            }
        });
    };
    Form.Field = Field_1.Field;
    Form.Submit = Submit_1.Submit;
    Form.Behavior = Behavior_1.Behavior;
    Form.propTypes = {
        /** "action" - to ba passes as form action. */
        action: prop_types_1.PropTypes.string.isRequired,
        /** "submitLabel" - will be set as label of submit button */
        submitLabel: prop_types_1.PropTypes.string,
        /** "submitHandler" - handle form submit is required */
        submitHandler: prop_types_1.PropTypes.func.isRequired,
        /** "submitSuccess" - handle success form submission */
        submitSuccess: prop_types_1.PropTypes.func,
        /** "submitError" - handle error form submission */
        submitError: prop_types_1.PropTypes.func,
        /** children - all children between Form tags */
        children: prop_types_1.PropTypes.arrayOf(prop_types_1.PropTypes.element),
        /** "method" - to ba passes as form method (POST, GET). */
        method: prop_types_1.PropTypes.string,
        /** "validateOn" - array of hooks to trigger validation process ['submit', "blur", "click"]*/
        validateOn: prop_types_1.PropTypes.arrayOf(prop_types_1.PropTypes.string),
    };
    Form.defaultProps = {
        action: '/',
        method: 'POST',
        validateOn: ['submit'],
        submitLabel: 'Submit',
        submitHandler: function () { throw new Error('Please provide submit handler'); }
    };
    Form = __decorate([
        ValidationDecorator_1.ValidationDecorator
    ], Form);
    return Form;
}(React.Component));
exports.Form = Form;
