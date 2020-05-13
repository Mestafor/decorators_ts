import { db } from '../app';
import { Request, Response } from 'express';

interface UserDetails {
    username: string;
    password: string;
}

type Roles = 'reader' | 'writer' | 'deleter';

export function auth(requiredRole: Roles) {
    return function(target: any, propertyKey: string, descriptor:PropertyDescriptor) {
        const original = descriptor.value;
        descriptor.value = function(...args: any[]) {
            const req = args[0] as Request;
            const res = args[1] as Response;
            const url = req.url;
            const entity = req.baseUrl.replace('/', '');
            const authHeader = req.headers.authorization;
            // Did user pass in authentication
            if(!authHeader) {
                res.status(403).send('Not authorized');
                return;
            }

            // Is this a valid user with a valid password
            if(!isValidUser(authHeader)) {
                res.status(403).send('Invalid user');
                return;
            }

            // Does user prossess the correct role
            if(!doesUserHavePermission(entity, requiredRole, authHeader)) {
                res.status(403).send('User does not have permission');
                return;
            }

            original.apply(this, args);
        }
    }
}

function getUserDetails(authHeader: string): UserDetails {
    const base64Auth = (authHeader || '').split(' ')[1] || '';
    const strauth = Buffer.from(base64Auth, 'base64').toString();
    const splitIndex = strauth.indexOf(':');
    const username = strauth.substring(0, splitIndex);
    const password = strauth.substring(splitIndex + 1);
    return {
        username,
        password,
    };
}

function isValidUser(authHeader: string): boolean {
    const details = getUserDetails(authHeader);
    const user = db.getData('/users');
    if(!user.hasOwnProperty(details.username)) {
        return false;
    }
    if(user[details.username].password !== details.password) {
        return false;
    }

    return true;
}

function doesUserHavePermission(entityName: string, requiredRole: string, authHEader:  string): boolean {
    const users = db.getData('/users');
    const details = getUserDetails(authHEader);
    const userRoles = users[details.username].permissions[entityName];
    if(!userRoles) {
        return false;
    }
    if(userRoles && userRoles.indexOf(requiredRole) > -1) {
        return true;
    }
    return false;
}
