import { AppError } from './../errors/appError';
import { AccountRepository } from './../repositories/account.repository';
import { TransactionRepository } from './../repositories/transaction.repository';
import { createTransactionService, filterTransactionService } from '../services/transaction/transaction.service';
import { Request, Response } from "express";
import { Between } from "typeorm";

export class TransactionController {
    static create = async (req: Request, res: Response) => {
        const {accountId, username} = req.user;
        const {usernameCashIn, value} = req.body;
        
        const transaction = await createTransactionService(accountId, username, usernameCashIn, value);

        return res.status(200).json(transaction);
    }

    static filterTransactions = async (req: Request, res: Response) => {
        const {start_date, end_date, cashIn, cashOut} = req.body;
        const {accountId} = req.user;

        const transactions = await filterTransactionService(accountId, start_date, end_date, cashIn, cashOut);

        return res.status(200).json(transactions);

    }
}