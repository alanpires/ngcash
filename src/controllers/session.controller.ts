import {Request, Response} from "express";
import { loginService } from "../services/session.service";

export class SessionController {
    static login = async (req: Request, res: Response) => {
        const {username, password} = req.body;

        const token = await loginService({username, password});

        return res.status(200).json(token);
    }
}