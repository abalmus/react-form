"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var lodash_1 = require("lodash");
function ErrorContainer(props) {
    if (props.errors.length) {
        return (React.createElement("div", { className: "errors" },
            props.children,
            props.errors.map(function (error, index) {
                return (React.createElement("small", { className: "error", key: index }, lodash_1.values(error)));
            })));
    }
    else {
        return React.createElement("div", null, props.children);
    }
}
exports.default = ErrorContainer;
;
