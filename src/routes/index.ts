import { Express } from "express";
import UserRouter from "./user.router";

export default (app: Express) => {
    UserRouter(app);
}