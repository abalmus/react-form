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
var lodash_1 = require("lodash");
var behaviors = require("./utils/behaviors");
var Behavior = /** @class */ (function (_super) {
    __extends(Behavior, _super);
    function Behavior() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Behavior.prototype.render = function () {
        var _a = this.props, hideIf = _a.hideIf, showIf = _a.showIf, children = _a.children;
        var behaviorsToApply = behaviors.behaviorDetector(this.props);
        var childProps = {};
        var visibility = showIf && !hideIf ? false : true;
        if (behaviorsToApply.showIf) {
            visibility = true;
        }
        if (behaviorsToApply.hideIf) {
            visibility = false;
        }
        if (behaviorsToApply.disableIf) {
            childProps.disabled = true;
        }
        return (React.createElement("section", { className: "behavior" }, visibility ?
            lodash_1.map(children, function (child) { return React.cloneElement(child, childProps); }) :
            null));
    };
    return Behavior;
}(React.Component));
exports.Behavior = Behavior;
