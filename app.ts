import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import APIServer from './APIServer';
import {Person} from './entities/Person';

export enum HttpMethods {
    get = "get",
    head = "head",
    options = "options",
    post = "post",
    put = "put",
};

export const apiServer = new APIServer();
export const db = new JsonDB(new Config("entityDatabase", true, true, '/'));

apiServer.addEntity<Person>(Person);

apiServer.start();