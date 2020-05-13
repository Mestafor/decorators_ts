"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var EntityRouter_1 = require("./routers/EntityRouter");
var APIServer = /** @class */ (function () {
    function APIServer() {
        this._server = null;
        this._app = express_1.default();
        // Set port
        this._app.set('port', process.env.PORT || 3300);
        this.configureMiddleware();
    }
    Object.defineProperty(APIServer.prototype, "app", {
        get: function () {
            return this._app;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APIServer.prototype, "server", {
        get: function () {
            return this._server;
        },
        enumerable: true,
        configurable: true
    });
    APIServer.prototype.configureMiddleware = function () {
        this._app.use(body_parser_1.default.json());
        this._app.use(body_parser_1.default.urlencoded({ extended: true }));
        // Setup CORS
        this.app.use(function (req, res, next) {
            res.setHeader('Access-Controll-Allow-Origin', "*");
            res.setHeader('Access-Controll-Allow-Credentials', "true");
            res.setHeader('Access-Controll-Allow-Methods', "GET,HEAD,OPTIONS,POST,PUT");
            res.setHeader('Access-Controll-Allow-Headers', "Access-Control-Allow-Origin");
            next();
        });
    };
    APIServer.prototype.addEntity = function (clazz) {
        var name = Reflect.getMetadata("entity:name", clazz);
        var entityRouter = new EntityRouter_1.EntityRouter(name, clazz);
        this._app.use("/" + name, entityRouter.router);
    };
    APIServer.prototype.start = function () {
        var _this = this;
        this._server = this._app.listen(this._app.get("port"), function () {
            console.log("Server is running on port " + _this._app.get("port"));
        });
    };
    return APIServer;
}());
exports.default = APIServer;
//# sourceMappingURL=APIServer.js.map