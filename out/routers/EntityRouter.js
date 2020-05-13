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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("../app");
var uuid = __importStar(require("uuid"));
var express_1 = require("express");
var BaseEntity_1 = require("../entities/BaseEntity");
var decorators_1 = require("../decorators");
var EntityRouter = /** @class */ (function () {
    function EntityRouter(name, classRef) {
        this.name = name;
        this.classRef = classRef;
        this._router = express_1.Router();
        this.addEntityRoutes();
    }
    Object.defineProperty(EntityRouter.prototype, "router", {
        get: function () {
            return this._router;
        },
        enumerable: true,
        configurable: true
    });
    EntityRouter.prototype.addEntityRoutes = function () {
        var _this = this;
        // CREATE
        this._router.post('/', function (req, res) {
            _this.createEntity(req, res);
        });
        // READ all
        this._router.get('/', function (req, res) {
            _this.fetchAllEntity(req, res);
        });
        // READ one
        this._router.get('/:id', function (req, res) {
            _this.fetchEntity(req, res);
        });
        // UPDATE
        this._router.put('/:id', function (req, res) {
            _this.updateEntity(req, res);
        });
        // DELETE
        this._router.delete('/:id', function (req, res) {
            _this.deleteEntity(req, res);
        });
    };
    EntityRouter.prototype.fetchAllEntity = function (req, res) {
        var data = app_1.db.getData("/" + this.name);
        res.json(data);
    };
    EntityRouter.prototype.fetchEntity = function (req, res) {
        var data = app_1.db.getData("/" + this.name + "/" + req.params.id);
        res.json(data);
    };
    EntityRouter.prototype.createEntity = function (req, res) {
        var newEntity = BaseEntity_1.EntityFactory.fromPersistenceObject(req.body, this.classRef);
        var errorMap = decorators_1.validate(newEntity);
        if (Object.keys(errorMap).length > 0) {
            var output = { errors: errorMap };
            res.status(400).json(output);
            return;
        }
        var idProperty = Reflect.getMetadata("entity:id", newEntity);
        newEntity[idProperty] = uuid.v4();
        app_1.db.push("/" + this.name + "/" + newEntity[idProperty], newEntity.getPersistenceObject());
        res.status(200).json(newEntity);
    };
    EntityRouter.prototype.updateEntity = function (req, res) {
        // Does entity exist with ID
        var data = {};
        try {
            data = app_1.db.getData("/" + this.name + "/" + req.params.id);
        }
        catch (err) {
            res.status(404).json({ error: "Object does not exist" });
            return;
        }
        // Update Object with new values
        var updatedData = req.body;
        var updatedObj = BaseEntity_1.EntityFactory.fromPersistenceObject(data, this.classRef);
        var propKeys = Object.keys(updatedData);
        for (var _i = 0, propKeys_1 = propKeys; _i < propKeys_1.length; _i++) {
            var propKey = propKeys_1[_i];
            updatedObj[propKey] = updatedData[propKey];
        }
        // Validate
        var errorMap = decorators_1.validate(updatedObj);
        if (Object.keys(errorMap).length > 0) {
            var output = { errors: errorMap };
            res.status(400).json(output);
            return;
        }
        // Save and Return data
        app_1.db.push("/" + this.name + "/" + req.params.id, updatedData, false);
        data = app_1.db.getData(this.name + "/" + req.params.id);
        res.json(data);
    };
    EntityRouter.prototype.deleteEntity = function (req, res) {
        app_1.db.delete("/" + this.name + "/" + req.params.id);
        res.json({});
    };
    __decorate([
        decorators_1.auth('reader'),
        decorators_1.logRoute,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], EntityRouter.prototype, "fetchAllEntity", null);
    __decorate([
        decorators_1.auth('reader'),
        decorators_1.logRoute,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], EntityRouter.prototype, "fetchEntity", null);
    __decorate([
        decorators_1.auth('writer'),
        decorators_1.logRoute,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], EntityRouter.prototype, "createEntity", null);
    __decorate([
        decorators_1.auth('writer'),
        decorators_1.logRoute,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], EntityRouter.prototype, "updateEntity", null);
    __decorate([
        decorators_1.auth('deleter'),
        decorators_1.logRoute,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], EntityRouter.prototype, "deleteEntity", null);
    return EntityRouter;
}());
exports.EntityRouter = EntityRouter;
//# sourceMappingURL=EntityRouter.js.map