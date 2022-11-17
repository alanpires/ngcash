import { findAccountService } from './../services/account.service';
import { Request, Response } from 'express';
import { AccountRepository } from '../repositories/account.repository';
import { AppError } from '../errors/appError';
import { TransactionRepository } from '../repositories/transaction.repository';
import { Between } from 'typeorm';

export class AccountController {
    static list = async (req: Request, res: Response) => {
        const {accountId} = req.user;
        
        const findAccount = await findAccountService(accountId);

        return res.status(200).json(findAccount);
    }
}