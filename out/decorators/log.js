"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function logRoute(target, propertyKeys, description) {
    var original = description.value;
    description.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var req = args[0];
        var res = args[1];
        original.apply(this, args);
        console.log(req.ip + " [" + new Date().toISOString() + "] " + req.host + " " + req.originalUrl);
        if (['PUT', 'POST'].includes(req.method)) {
            console.log("\tBODY: " + JSON.stringify(req.body));
        }
    };
}
exports.logRoute = logRoute;
//# sourceMappingURL=log.js.map