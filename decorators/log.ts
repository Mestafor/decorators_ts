import { Request, Response } from 'express';

export function logRoute(target: any, propertyKeys: string, description: PropertyDescriptor) {
    const original = description.value;
    description.value = function (...args: any[]) {
        const req = args[0] as Request;
        const res = args[1] as Response;
        
        original.apply(this, args);
        
        console.log(`${req.ip} [${new Date().toISOString()}] ${req.host} ${req.originalUrl}`);
        
        if (['PUT', 'POST'].includes(req.method)) {
            console.log(`\tBODY: ${JSON.stringify(req.body)}`);
        }
    }
}