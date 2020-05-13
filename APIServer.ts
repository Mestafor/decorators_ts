import * as http from 'http';
import express, { Request, Response, Express } from 'express';
import bodyParser from 'body-parser';
import { BaseEntity } from './entities/BaseEntity';
import { EntityRouter } from './routers/EntityRouter';

export default class APIServer {

    private _app: Express;

    get app(): Express {
        return this._app;
    }

    private _server: http.Server | null = null;

    get server(): http.Server | null {
        return this._server;
    }

    constructor() {
        this._app = express();

        // Set port
        this._app.set('port', process.env.PORT || 3300);

        this.configureMiddleware();
    }

    public configureMiddleware() {
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({ extended: true }));

        // Setup CORS
        this.app.use((req, res, next) => {
            res.setHeader('Access-Controll-Allow-Origin', "*");
            res.setHeader('Access-Controll-Allow-Credentials', "true");
            res.setHeader('Access-Controll-Allow-Methods', "GET,HEAD,OPTIONS,POST,PUT");
            res.setHeader('Access-Controll-Allow-Headers', "Access-Control-Allow-Origin");
            next();
        });
    }

    public addEntity<T extends BaseEntity>(clazz: any) {
        const name = Reflect.getMetadata("entity:name", clazz);
        const entityRouter = new EntityRouter<T>(name, clazz);
        this._app.use(`/${name}`, entityRouter.router);
    }

    public start() {
        this._server = this._app.listen(this._app.get("port"), () => {
            console.log(`Server is running on port ${this._app.get("port")}`);
        })
    }

}