import "reflect-metadata";

export type EntityTypeInstance<T> = new (...args: any[]) => T;

export class EntityFactory {

    static fromPersistenceObject<T extends IEntity>(obj: { [key: string]: any }, type: EntityTypeInstance<T>): T {
        let output = new type();
        const persistedProperties: string[] = Reflect.getMetadata("entity:properties", output) || [];
        const idProperty = Reflect.getMetadata("entity:id", output);
        const props = Object.keys(obj);
        for (const prop of props) {
            if (persistedProperties.includes(prop) || prop == idProperty) {
                (output as any)[prop] = obj[prop];
            }
            else {
                throw new Error("Property not defined in class.")
            }
        }
        return output;
    }

}

export interface IEntity {
    getPersistenceObject(): any;
}

export class BaseEntity implements IEntity {

    getPersistenceObject() {
        let output = {};
        const persistedProperties: string[] = Reflect.getMetadata("entity:properties", this);
        const idProperty = Reflect.getMetadata("entity:id", this);
        (output as any)[idProperty] = (this as any)[idProperty];
        for (const prop of persistedProperties) {
            if ((this as any)[prop]) {
                (output as any)[prop] = (this as any)[prop];
            }
        }
        return output;
    }


}