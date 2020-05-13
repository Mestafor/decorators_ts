import { Request, Response } from 'express';
import { HttpMethods, apiServer } from '../app';

export class APIRoutes {

    @logRoute()
    @router(HttpMethods.get, "/")
    public indexRoute(req: Request, res: Response) {
        return {
            "Hello": "World"
        }
    }

    @logRoute()
    @router(HttpMethods.get, "/people")
    @authenticate("123456")
    public peopleRoute(req: Request, res: Response) {
        return {
            people: [
                {
                    firstName: "Alex",
                    lastName: "M"
                },
                {
                    firstName: "Afoska",
                    lastName: "Fafyfka"
                }
            ]
        }
    }

}

function router(method: HttpMethods, path: string): MethodDecorator {
    return function (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): void {
        (apiServer.app as any)[method](path, (req: Request, res: Response) => {
            res.status(200).json(descriptor.value(req, res));
        })
    }
}

function logRoute(): MethodDecorator {
    return function (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): void {
        const originalDescriptor = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const req = args[0] as Request;
            console.log(`${req.url} ${req.method} Method`);
            return originalDescriptor.apply(this, args);
        };
    }
}

function authenticate(key: string): MethodDecorator {
    return function (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): void {
        const originalDescriptor = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const req = args[0] as Request;
            const res = args[1] as Response;
            const headers = req.headers;

            if (headers.hasOwnProperty('apiKey') && headers.apiKey === key) {
                return originalDescriptor.apply(this, args);
            }

            res.status(403).json({ error: "Not Authorized" });

        };
    }
}