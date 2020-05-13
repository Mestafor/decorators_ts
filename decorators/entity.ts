import "reflect-metadata";

export function entity(name: string) {
    return function (constructor: Function) {
        Reflect.defineMetadata("entity:name", name, constructor);
    }
}

export function persist(target: any, proprtKey: string) {
    let objectProperties: string[] = Reflect.getMetadata("entity:properties", target) || [];
    if(!objectProperties.includes(proprtKey)) {
        objectProperties.push(proprtKey);
        Reflect.defineMetadata("entity:properties", objectProperties, target);
    }
}

export function id(target: any, propertyKey: string) {
    Reflect.defineMetadata("entity:id", propertyKey, target);
}