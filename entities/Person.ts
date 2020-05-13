import { BaseEntity } from './BaseEntity';
import { required, length, isEmail, isPhone, isInteger, entity, id, persist } from '../decorators';

@entity("humans")
export class Person extends BaseEntity {

    @id
    id: string;

    @persist
    @required
    @length(3, 100)
    firstName: string;

    @persist
    @required
    @length(3, 100)
    lastName: string;

    @persist
    @required
    @isEmail
    email: string;

    @persist
    departament: string;

    @persist
    @required
    @isPhone
    mobileNumber: string;

    @persist
    @required
    @isInteger(1, 120)
    age: number;

    sayHello() {
        console.log('Say Hello');
    }
}