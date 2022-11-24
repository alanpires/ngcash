import { Request, Response } from 'express';
import { createUserService } from '../services/user/user.service';

export class UserController {
  static createUser = async (req: Request, res: Response) => {
    /*
      #swagger.tags = ['Users']
      #swagger.summary = 'create users'
      #swagger.description = 'On this endpoint it will be possible to create a new user by entering a username and password.'

      #swagger.requestBody = {
        description: 'Add a user, the username must contain at least eight characters, the password must contain at least eight characters, have a number and a capital letter.',
        required: true,
        schema: { $ref: "#/definitions/User" }
      }

      #swagger.responses[201] = {
        description: 'Created',
        schema: {$ref: '#/definitions/UserCreated'}
      }
      #swagger.responses[400]
      #swagger.responses[500]
    */

    const user = await createUserService(req.validateUser);

    const { password, ...userWhithoutPassword } = user;

    return res.status(201).json(userWhithoutPassword);
  };
}
