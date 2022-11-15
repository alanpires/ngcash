import { Request, Response } from "express";
import { createUserService } from "../services/user.service";
import { instanceToPlain } from "class-transformer";

export class UserController {
    static createUser = async (req: Request, res: Response) => {

    const { username, password } = req.body;

    const user = await createUserService({username, password});

    return res.status(201).json(instanceToPlain(user));

    }
}