import { isAuthenticatedMiddleware } from './../middlewares/isAuthenticatedMiddleware';
import { TransactionController } from './../controllers/transaction.controller';
import { Router, Express } from "express";

const router = Router();

export default (app: Express) => {
    router.post("/transactions", isAuthenticatedMiddleware, TransactionController.create);
    router.post("/transactions/filter", isAuthenticatedMiddleware, TransactionController.filterTransactions)

    app.use("/api/", router)
}