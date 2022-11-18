import { AppError } from './../errors/appError';
import { Request, Response, NextFunction } from "express";

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