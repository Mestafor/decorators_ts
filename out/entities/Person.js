"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var BaseEntity_1 = require("./BaseEntity");
var decorators_1 = require("../decorators");
var Person = /** @class */ (function (_super) {
    __extends(Person, _super);
    function Person() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Person.prototype.sayHello = function () {
        console.log('Say Hello');
    };
    __decorate([
        decorators_1.id,
        __metadata("design:type", String)
    ], Person.prototype, "id", void 0);
    __decorate([
        decorators_1.persist,
        decorators_1.required,
        decorators_1.length(3, 100),
        __metadata("design:type", String)
    ], Person.prototype, "firstName", void 0);
    __decorate([
        decorators_1.persist,
        decorators_1.required,
        decorators_1.length(3, 100),
        __metadata("design:type", String)
    ], Person.prototype, "lastName", void 0);
    __decorate([
        decorators_1.persist,
        decorators_1.required,
        decorators_1.isEmail,
        __metadata("design:type", String)
    ], Person.prototype, "email", void 0);
    __decorate([
        decorators_1.persist,
        __metadata("design:type", String)
    ], Person.prototype, "departament", void 0);
    __decorate([
        decorators_1.persist,
        decorators_1.required,
        decorators_1.isPhone,
        __metadata("design:type", String)
    ], Person.prototype, "mobileNumber", void 0);
    __decorate([
        decorators_1.persist,
        decorators_1.required,
        decorators_1.isInteger(1, 120),
        __metadata("design:type", Number)
    ], Person.prototype, "age", void 0);
    Person = __decorate([
        decorators_1.entity("humans")
    ], Person);
    return Person;
}(BaseEntity_1.BaseEntity));
exports.Person = Person;
//# sourceMappingURL=Person.js.map