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
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("@tacitknowledge/validator");
function ValidationDecorator(constructor) {
    return /** @class */ (function (_super) {
        __extends(Form, _super);
        function Form() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.validationProcessor = new validator_1.ValidationProcessor(_this.props.validationRules, {
                dependsOnValues: _this.formState,
            });
            _this.errorsPopulator = new validator_1.ErrorsPopulator(_this.validationProcessor);
            _this.silentErrors = {};
            return _this;
        }
        Form.prototype.validateField = function (fieldName, value, silently) {
            var _this = this;
            if (silently === void 0) { silently = false; }
            this.validationProcessor.validate(fieldName, value);
            return this.errorsPopulator.getByField(fieldName).then(function (errors) {
                if (silently) {
                    var filedErrors = (_a = {}, _a[fieldName] = errors, _a);
                    _this.silentErrors = Object.assign({}, _this.silentErrors, filedErrors);
                    return filedErrors;
                }
                _this.populateErrors(errors, fieldName);
                var _a;
            });
        };
        Form.prototype.validateForm = function (cb) {
            var _this = this;
            var fieldsToValidate = [];
            for (var key in this.formState) {
                fieldsToValidate.push(this.validateField(key, this.formState[key]));
            }
            ;
            Promise.all(fieldsToValidate).then(function () {
                var errors = _this.state.errors;
                cb.call(_this, errors);
            });
        };
        Form.prototype.validateFormSilently = function (cb) {
            var _this = this;
            var fieldsToValidate = [];
            for (var key in this.formState) {
                fieldsToValidate.push(this.validateField(key, this.formState[key], true));
            }
            ;
            Promise.all(fieldsToValidate).then(function () {
                cb && typeof cb === 'function' && cb.call(_this, _this.silentErrors);
            });
        };
        Form.prototype.populateErrors = function (errors, fieldName) {
            this.setState(function (prevState) {
                return errors_1.normalizeErrors(prevState, errors, fieldName);
            });
        };
        return Form;
    }(constructor));
}
exports.ValidationDecorator = ValidationDecorator;
