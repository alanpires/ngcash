import { Express } from "express";
import UserRouter from "./user.router";
import AccountRouter from "./account.router";
import TransactionRouter from "./transaction.router";
import SessionRouter from "./session.router";
import SwaggerRouter from "./swagger.router";

export default (app: Express) => {
    UserRouter(app);
    AccountRouter(app);
    TransactionRouter(app);
    SessionRouter(app);
    SwaggerRouter(app);
}