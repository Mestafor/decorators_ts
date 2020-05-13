"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var EntityFactory = /** @class */ (function () {
    function EntityFactory() {
    }
    EntityFactory.fromPersistenceObject = function (obj, type) {
        var output = new type();
        var persistedProperties = Reflect.getMetadata("entity:properties", output) || [];
        var idProperty = Reflect.getMetadata("entity:id", output);
        var props = Object.keys(obj);
        for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
            var prop = props_1[_i];
            if (persistedProperties.includes(prop) || prop == idProperty) {
                output[prop] = obj[prop];
            }
            else {
                throw new Error("Property not defined in class.");
            }
        }
        return output;
    };
    return EntityFactory;
}());
exports.EntityFactory = EntityFactory;
var BaseEntity = /** @class */ (function () {
    function BaseEntity() {
    }
    BaseEntity.prototype.getPersistenceObject = function () {
        var output = {};
        var persistedProperties = Reflect.getMetadata("entity:properties", this);
        var idProperty = Reflect.getMetadata("entity:id", this);
        output[idProperty] = this[idProperty];
        for (var _i = 0, persistedProperties_1 = persistedProperties; _i < persistedProperties_1.length; _i++) {
            var prop = persistedProperties_1[_i];
            if (this[prop]) {
                output[prop] = this[prop];
            }
        }
        return output;
    };
    return BaseEntity;
}());
exports.BaseEntity = BaseEntity;
//# sourceMappingURL=BaseEntity.js.map