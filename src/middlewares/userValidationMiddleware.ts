import { User } from './../entities/user.entity';
import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

export const UserValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const user = plainToInstance(User, req.body);

    validate(user).then(errors => {
        // errors is an array of validation errors
        if (errors.length > 0) {
            return res.status(400).json(errors)
        } else {
            console.log('validation succeed');
            return next();
        }
      });
}