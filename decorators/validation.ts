import validator from 'validator';
import 'reflect-metadata';

const VALIDATION_RULES = Symbol('validation:rules');
const VALIDATION_PROPERTIES = Symbol('validation:properties');

type  ValidationFunction = (target: any, propertyKey: string, validatorOptions?: any) => string | void;

interface ValidationRules<T = any> {
    validationOptions?: T;
    validator: ValidationFunction;
}

export function validate(object: any) {
    console.log(object);
    const keys = Reflect.getMetadata(VALIDATION_PROPERTIES, object) as string[];
    let errorMap: any = {};

    if(!keys || !Array.isArray(keys)) {
        return errorMap;
    }

    for(const key of keys) {
        const rules: ValidationRules[] = Reflect.getMetadata(VALIDATION_RULES, object, key) as ValidationRules[];
        if(!Array.isArray(rules)) {
            continue;
        }

        for(const rule of rules) {
            const errorMessage = rule.validator(object, key, rule.validationOptions);
            if(errorMessage) {
                errorMap[key] = errorMap[key] || [];
                errorMap[key].push(errorMessage);
            }
        }
    }

    return errorMap;
}

export function isEmail(target: any, propertyKey: string) {
    addValidation(target, propertyKey, emailValidator);
}

export function required(target: any, propertyKey: string) {
    addValidation(target, propertyKey, requiredValidator);
}

export function length(minimum: number, maximum: number) {
    const options = {
        minimum,
        maximum,
    };

    return function (target: any, propertyKey: string) {
        addValidation(target, propertyKey, lengthValidator, options);
    }
}

export function isPhone(target: any, propertyKey: string) {
    addValidation(target, propertyKey, phoneValidator);
}

export function isInteger(minimum: number, maximum: number) {
    const options = {
        minimum,
        maximum,
    };

    return function (target: any, propertyKey: string) {
        addValidation(target, propertyKey, integerValidator, options);
    }
}

function addValidation(target: any, propertyKey: string, validator: ValidationFunction, validationOptions?: any) {
    // Make sure we have the list of all properties for the object
    let objectProperties: string[] = Reflect.getMetadata(VALIDATION_PROPERTIES, target) || [];
    if(!objectProperties.includes(propertyKey)) {
        objectProperties.push(propertyKey);
        Reflect.defineMetadata(VALIDATION_PROPERTIES, objectProperties, target);
    }

    // Make sure we capture validation rule
    let validators: ValidationRules<{minimum: number, maximin: number}>[] = Reflect.getMetadata(VALIDATION_RULES, target, propertyKey) || [];
    let validationRule = {
        validator,
        validationOptions,
    };
    validators.push(validationRule);
    Reflect.defineMetadata(VALIDATION_RULES, validators, target, propertyKey);
}

// Validator Function
function emailValidator(target: any, propertyKey: string): string | void {
    let value = target[propertyKey];
    if(value == null) {
        return;
    }

    const isValid = validator.isEmail(value);
    if(!isValid) {
        return `Property ${propertyKey} must be a valid email.`;
    }

    return;
}

function requiredValidator(target: any, propertyKey: string): string | void {
    let value = target[propertyKey];
    if(value) {
        return;
    }
    return `Property ${propertyKey} is required.`;
}

function integerValidator(target: any, propertyKey: string, validatorOptions: any): string | void {
    const value = target[propertyKey];
    if(value == null) {
        return;
    }
    console.log('!!!!!!!!!!!!!!!!!' , value);
    const errorMesasge = `Property ${propertyKey} must be an integer between ${validatorOptions.minimum} - ${validatorOptions.maximum}`;
    if(!Number.isInteger(value)) {
        return errorMesasge;
    }
    if(value >= validatorOptions.minimum && value <= validatorOptions.maximum ) {
        return;
    }
    return errorMesasge;
}

function lengthValidator(target: any, propertyKey: string, validationOptions: any): string | void {
    const options = {
        min: validationOptions.minimum,
        max: validationOptions.maximum,
    };
    const isValid = validator.isLength(target[propertyKey] + '', options);
    if(!isValid) {
        return `Property ${propertyKey} must be a string between ${validationOptions.mininum} and ${validationOptions.maximum}.`
    }
    return;
}

function phoneValidator(target: any, propertyKey: string): string | void {
    const value = target[propertyKey];
    if(value == null) {
        return;
    }
    const isValid = validator.isMobilePhone(value);
    if(!isValid) {
        return `Property ${propertyKey} must be a valid phone number.`;
    }
    return;
}