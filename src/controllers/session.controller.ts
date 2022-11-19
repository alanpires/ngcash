import {Request, Response} from "express";
import { loginService } from "../services/session/session.service";

export class SessionController {
    static login = async (req: Request, res: Response) => {
        /*
            #swagger.tags = ['Login']
            #swagger.summary = 'system login'
            #swagger.description = 'In this endpoint it will be possible to create the login of the user in the system informing the username and password.'
            

            #swagger.requestBody = {
            description: 'To login you must enter a valid username and password.',
            required: true,
            schema: { $ref: "#/definitions/User" }
            }

            #swagger.responses[200] = {
            description: 'OK',
            schema: {$ref: '#/definitions/Token'}
            }
            #swagger.responses[400]
            #swagger.responses[500]
        */
        const {username, password} = req.body;

        const token = await loginService({username, password});

        return res.status(200).json(token);
    }
}

