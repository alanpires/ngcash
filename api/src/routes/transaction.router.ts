import {
  createTransactionSchema,
  filterTransactionSchema,
} from './../schemas/transaction.schema';
import { ValidationDataMiddleware } from './../middlewares/validationDataMiddleware';
import { isAuthenticatedMiddleware } from './../middlewares/isAuthenticatedMiddleware';
import { TransactionController } from './../controllers/transaction.controller';
import { Router, Express } from 'express';

const router = Router();

export default (app: Express) => {
  router.post(
    '/transactions',
    isAuthenticatedMiddleware,
    ValidationDataMiddleware(createTransactionSchema),
    TransactionController.create,
  );
  router.post(
    '/transactions/filter',
    isAuthenticatedMiddleware,
    ValidationDataMiddleware(filterTransactionSchema),
    TransactionController.filterTransactions,
  );
  router.get(
    '/transactions',
    isAuthenticatedMiddleware,
    TransactionController.listTransactions,
  );

  app.use('/', router);
};
