import { Request, Response } from "express";
import { createUserService } from "../services/user/user.service";

export class UserController {
    static createUser = async (req: Request, res: Response) => {

    const user = await createUserService(req.validateUser);

    const {password, ...userWhithoutPassword} = user

    return res.status(201).json(userWhithoutPassword);

    }

}