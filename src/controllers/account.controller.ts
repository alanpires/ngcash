import { Request, Response } from 'express';
import { AccountRepository } from '../repositories/account.repository';

export class AccountController {
    static list = async (req: Request, res: Response) => {
        const {accountId} = req.user;
        
        const findAccount = await AccountRepository.findById(accountId);

        return res.status(200).json(findAccount);
    }
}