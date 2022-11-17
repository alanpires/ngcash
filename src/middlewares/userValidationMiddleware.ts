import { AppError } from './../errors/appError';
import { userSchema } from './../schemas/user.schema';
import { Request, Response, NextFunction } from "express";
import * as yup from 'yup';

// export const UserValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     const user = plainToInstance(User, req.body);

//     validate(user).then(errors => {
//         // errors is an array of validation errors
//         if (errors.length > 0) {
//             return res.status(400).json(errors)
//         } else {
//             console.log('validation succeed');
//             return next();
//         }
//       });
// }

export const UserValidationMiddleware = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    const resource = req.body;

    try {
        const validatedBody = await schema.validate(resource, {
            abortEarly: false
        });
        req.validateUser = validatedBody;

        next();
    } catch (e: any) {
        console.error(e);

        if (e instanceof(AppError)) {
            res.status(400).json(e)
        }

        res.status(400).json({error: e.errors})
    }
}