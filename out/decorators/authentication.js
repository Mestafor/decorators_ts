"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("../app");
function auth(requiredRole) {
    return function (target, propertyKey, descriptor) {
        var original = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var req = args[0];
            var res = args[1];
            var url = req.url;
            var entity = req.baseUrl.replace('/', '');
            var authHeader = req.headers.authorization;
            // Did user pass in authentication
            if (!authHeader) {
                res.status(403).send('Not authorized');
                return;
            }
            // Is this a valid user with a valid password
            if (!isValidUser(authHeader)) {
                res.status(403).send('Invalid user');
                return;
            }
            // Does user prossess the correct role
            if (!doesUserHavePermission(entity, requiredRole, authHeader)) {
                res.status(403).send('User does not have permission');
                return;
            }
            original.apply(this, args);
        };
    };
}
exports.auth = auth;
function getUserDetails(authHeader) {
    var base64Auth = (authHeader || '').split(' ')[1] || '';
    var strauth = Buffer.from(base64Auth, 'base64').toString();
    var splitIndex = strauth.indexOf(':');
    var username = strauth.substring(0, splitIndex);
    var password = strauth.substring(splitIndex + 1);
    return {
        username: username,
        password: password,
    };
}
function isValidUser(authHeader) {
    var details = getUserDetails(authHeader);
    var user = app_1.db.getData('/users');
    if (!user.hasOwnProperty(details.username)) {
        return false;
    }
    if (user[details.username].password !== details.password) {
        return false;
    }
    return true;
}
function doesUserHavePermission(entityName, requiredRole, authHEader) {
    var users = app_1.db.getData('/users');
    var details = getUserDetails(authHEader);
    var userRoles = users[details.username].permissions[entityName];
    if (!userRoles) {
        return false;
    }
    if (userRoles && userRoles.indexOf(requiredRole) > -1) {
        return true;
    }
    return false;
}
//# sourceMappingURL=authentication.js.map