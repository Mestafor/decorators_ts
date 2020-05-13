"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function entity(name) {
    return function (constructor) {
        Reflect.defineMetadata("entity:name", name, constructor);
    };
}
exports.entity = entity;
function persist(target, proprtKey) {
    var objectProperties = Reflect.getMetadata("entity:properties", target) || [];
    if (!objectProperties.includes(proprtKey)) {
        objectProperties.push(proprtKey);
        Reflect.defineMetadata("entity:properties", objectProperties, target);
    }
}
exports.persist = persist;
function id(target, propertyKey) {
    Reflect.defineMetadata("entity:id", propertyKey, target);
}
exports.id = id;
//# sourceMappingURL=entity.js.map