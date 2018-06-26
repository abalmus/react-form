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
var React = require("react");
var Submit = /** @class */ (function (_super) {
    __extends(Submit, _super);
    function Submit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Submit.prototype.render = function () {
        var _a = this.props, label = _a.label, enabled = _a.enabled, processing = _a.processing, disableCondition = _a.disableCondition;
        var disabled = enabled ? processing : processing || disableCondition;
        return (React.createElement("button", { type: "submit", disabled: disabled }, label));
    };
    return Submit;
}(React.Component));
exports.Submit = Submit;
