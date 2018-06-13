"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
exports.normalizeErrors = function (state, errors, fieldName) {
    var _a;
    return { errors: errors.length ? [(_a = {}, _a[fieldName] = errors, _a)].concat(lodash_1.filter(state.errors, function (error) { return !error[fieldName]; })) :
            lodash_1.filter(state.errors, function (error) { return !error[fieldName]; }),
    };
};
//# sourceMappingURL=errors.js.map