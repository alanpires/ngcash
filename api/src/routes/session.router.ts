import { loginSchema } from './../schemas/login.schema';
import { ValidationDataMiddleware } from './../middlewares/validationDataMiddleware';
import { Router, Express } from 'express';
import { SessionController } from '../controllers/session.controller';

const router = Router();

export default (app: Express) => {
  router.post(
    '/login',
    ValidationDataMiddleware(loginSchema),
    SessionController.login,
  );

  app.use('/', router);
};
