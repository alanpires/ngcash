import { Request, Response, NextFunction } from "express";

export const ValidationDataMiddleware = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    const resource = req.body;

    try {
        await schema.validate(resource, {
            abortEarly: false
        });

        next();
    } catch (e: any) {
        console.error("Error during validation user data", e)

        return res.status(400).json({error: e.errors})
    }
}