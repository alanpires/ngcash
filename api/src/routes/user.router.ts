import { userSchema } from './../schemas/user.schema';
import { Router, Express } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserValidationMiddleware } from '../middlewares/userValidationMiddleware';

const router = Router();

export default (app: Express) => {
  router.post(
    '/create',
    UserValidationMiddleware(userSchema),
    UserController.createUser,
  );

  app.use('/', router);
};
