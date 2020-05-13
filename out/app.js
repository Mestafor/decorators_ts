"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_json_db_1 = require("node-json-db");
var JsonDBConfig_1 = require("node-json-db/dist/lib/JsonDBConfig");
var APIServer_1 = __importDefault(require("./APIServer"));
var Person_1 = require("./entities/Person");
var HttpMethods;
(function (HttpMethods) {
    HttpMethods["get"] = "get";
    HttpMethods["head"] = "head";
    HttpMethods["options"] = "options";
    HttpMethods["post"] = "post";
    HttpMethods["put"] = "put";
})(HttpMethods = exports.HttpMethods || (exports.HttpMethods = {}));
;
exports.apiServer = new APIServer_1.default();
exports.db = new node_json_db_1.JsonDB(new JsonDBConfig_1.Config("entityDatabase", true, true, '/'));
exports.apiServer.addEntity(Person_1.Person);
exports.apiServer.start();
//# sourceMappingURL=app.js.map