"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = __importDefault(require("validator"));
require("reflect-metadata");
var VALIDATION_RULES = Symbol('validation:rules');
var VALIDATION_PROPERTIES = Symbol('validation:properties');
function validate(object) {
    console.log(object);
    var keys = Reflect.getMetadata(VALIDATION_PROPERTIES, object);
    var errorMap = {};
    if (!keys || !Array.isArray(keys)) {
        return errorMap;
    }
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        var rules = Reflect.getMetadata(VALIDATION_RULES, object, key);
        if (!Array.isArray(rules)) {
            continue;
        }
        for (var _a = 0, rules_1 = rules; _a < rules_1.length; _a++) {
            var rule = rules_1[_a];
            var errorMessage = rule.validator(object, key, rule.validationOptions);
            if (errorMessage) {
                errorMap[key] = errorMap[key] || [];
                errorMap[key].push(errorMessage);
            }
        }
    }
    return errorMap;
}
exports.validate = validate;
function isEmail(target, propertyKey) {
    addValidation(target, propertyKey, emailValidator);
}
exports.isEmail = isEmail;
function required(target, propertyKey) {
    addValidation(target, propertyKey, requiredValidator);
}
exports.required = required;
function length(minimum, maximum) {
    var options = {
        minimum: minimum,
        maximum: maximum,
    };
    return function (target, propertyKey) {
        addValidation(target, propertyKey, lengthValidator, options);
    };
}
exports.length = length;
function isPhone(target, propertyKey) {
    addValidation(target, propertyKey, phoneValidator);
}
exports.isPhone = isPhone;
function isInteger(minimum, maximum) {
    var options = {
        minimum: minimum,
        maximum: maximum,
    };
    return function (target, propertyKey) {
        addValidation(target, propertyKey, integerValidator, options);
    };
}
exports.isInteger = isInteger;
function addValidation(target, propertyKey, validator, validationOptions) {
    // Make sure we have the list of all properties for the object
    var objectProperties = Reflect.getMetadata(VALIDATION_PROPERTIES, target) || [];
    if (!objectProperties.includes(propertyKey)) {
        objectProperties.push(propertyKey);
        Reflect.defineMetadata(VALIDATION_PROPERTIES, objectProperties, target);
    }
    // Make sure we capture validation rule
    var validators = Reflect.getMetadata(VALIDATION_RULES, target, propertyKey) || [];
    var validationRule = {
        validator: validator,
        validationOptions: validationOptions,
    };
    validators.push(validationRule);
    Reflect.defineMetadata(VALIDATION_RULES, validators, target, propertyKey);
}
// Validator Function
function emailValidator(target, propertyKey) {
    var value = target[propertyKey];
    if (value == null) {
        return;
    }
    var isValid = validator_1.default.isEmail(value);
    if (!isValid) {
        return "Property " + propertyKey + " must be a valid email.";
    }
    return;
}
function requiredValidator(target, propertyKey) {
    var value = target[propertyKey];
    if (value) {
        return;
    }
    return "Property " + propertyKey + " is required.";
}
function integerValidator(target, propertyKey, validatorOptions) {
    var value = target[propertyKey];
    if (value == null) {
        return;
    }
    console.log('!!!!!!!!!!!!!!!!!', value);
    var errorMesasge = "Property " + propertyKey + " must be an integer between " + validatorOptions.minimum + " - " + validatorOptions.maximum;
    if (!Number.isInteger(value)) {
        return errorMesasge;
    }
    if (value >= validatorOptions.minimum && value <= validatorOptions.maximum) {
        return;
    }
    return errorMesasge;
}
function lengthValidator(target, propertyKey, validationOptions) {
    var options = {
        min: validationOptions.minimum,
        max: validationOptions.maximum,
    };
    var isValid = validator_1.default.isLength(target[propertyKey] + '', options);
    if (!isValid) {
        return "Property " + propertyKey + " must be a string between " + validationOptions.mininum + " and " + validationOptions.maximum + ".";
    }
    return;
}
function phoneValidator(target, propertyKey) {
    var value = target[propertyKey];
    if (value == null) {
        return;
    }
    var isValid = validator_1.default.isMobilePhone(value);
    if (!isValid) {
        return "Property " + propertyKey + " must be a valid phone number.";
    }
    return;
}
//# sourceMappingURL=validation.js.map