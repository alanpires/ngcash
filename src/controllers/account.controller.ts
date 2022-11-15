import { AccountRepository } from './../repositories/account.repository';
import { Request, Response } from 'express';

export class AccountController {
    static list = async (req: Request, res: Response) => {
        const {accountId} = req.user;
        
        const findAccount = await AccountRepository.findOne({
            where: {
                id: accountId,
            },
            relations: {
                creditedAccounts: true,
                debitedAccounts: true
            }
        })

        return res.status(200).json(findAccount);
    }
}