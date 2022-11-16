import { isAuthenticatedMiddleware } from './../middlewares/isAuthenticatedMiddleware';
import { AccountController } from './../controllers/account.controller';
import {Express, Router} from "express";

const router = Router();

export default (app: Express) => {
    router.get("/accounts", isAuthenticatedMiddleware, AccountController.list);
    // router.post("/accounts/filter", isAuthenticatedMiddleware, AccountController.filterTransactions)

    app.use("/api/", router)
}