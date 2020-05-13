"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("../app");
var APIRoutes = /** @class */ (function () {
    function APIRoutes() {
    }
    APIRoutes.prototype.indexRoute = function (req, res) {
        return {
            "Hello": "World"
        };
    };
    APIRoutes.prototype.peopleRoute = function (req, res) {
        return {
            people: [
                {
                    firstName: "Alex",
                    lastName: "M"
                },
                {
                    firstName: "Afoska",
                    lastName: "Fafyfka"
                }
            ]
        };
    };
    __decorate([
        logRoute(),
        router(app_1.HttpMethods.get, "/"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], APIRoutes.prototype, "indexRoute", null);
    __decorate([
        logRoute(),
        router(app_1.HttpMethods.get, "/people"),
        authenticate("123456"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], APIRoutes.prototype, "peopleRoute", null);
    return APIRoutes;
}());
exports.APIRoutes = APIRoutes;
function router(method, path) {
    return function (target, propertyKey, descriptor) {
        app_1.apiServer.app[method](path, function (req, res) {
            res.status(200).json(descriptor.value(req, res));
        });
    };
}
function logRoute() {
    return function (target, propertyKey, descriptor) {
        var originalDescriptor = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var req = args[0];
            console.log(req.url + " " + req.method + " Method");
            return originalDescriptor.apply(this, args);
        };
    };
}
function authenticate(key) {
    return function (target, propertyKey, descriptor) {
        var originalDescriptor = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var req = args[0];
            var res = args[1];
            var headers = req.headers;
            if (headers.hasOwnProperty('apiKey') && headers.apiKey === key) {
                return originalDescriptor.apply(this, args);
            }
            res.status(403).json({ error: "Not Authorized" });
        };
    };
}
//# sourceMappingURL=APIRoutes.js.map