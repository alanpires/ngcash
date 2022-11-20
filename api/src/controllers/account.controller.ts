import { Request, Response } from 'express';
import { AccountRepository } from '../repositories/account.repository';

export class AccountController {
    static list = async (req: Request, res: Response) => {
        /*
            #swagger.tags = ['Accounts']
            #swagger.summary = 'get account'
            #swagger.description = 'In this endpoint it will be possible to search the users account, where the cashIns and cashOuts that participated will be informed.'

            #swagger.parameters['authorization'] = { 
                in: 'header',
                description: 'token'
            }

            #swagger.responses[200] = {
            description: 'OK',
            schema: {$ref: '#/definitions/GetAccount'}
            }

            #swagger.responses[400]
            #swagger.responses[500]
            #swagger.security = [{
               "bearerAuth": []
            }]
        */
        const {accountId} = req.user;
        
        const findAccount = await AccountRepository.findById(accountId);

        return res.status(200).json(findAccount);
    }
}