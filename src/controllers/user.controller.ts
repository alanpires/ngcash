import { Request, Response } from "express";
import { createUserService, loginService } from "../services/user.service";
import { instanceToPlain } from "class-transformer";

export class UserController {
    static createUser = async (req: Request, res: Response) => {

    const user = await createUserService(req.validateUser);

    const {password, ...userWhithoutPassword} = user

    return res.status(201).json(userWhithoutPassword);

    }

    static login = async (req: Request, res: Response) => {
        const {username, password} = req.body;

        const token = await loginService({username, password});

        return res.status(200).json(token);
    }
}