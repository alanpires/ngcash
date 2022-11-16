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

    // static filterTransactions = async (req: Request, res: Response) => {
    //     const {start_date, end_date, cashIn, cashOut} = req.body;
    //     const {accountId} = req.user;

    //     const account = await AccountRepository.findOneBy({
    //         id: accountId
    //     })

    //     if (!account) {
    //         throw new AppError(500, "Internal server error")
    //     }

    //     //Convertendo a data informada pelo usuário, pois o TypeORM faz a busca baseado no dia
    //     // e horário
    //     const startDateConverted = new Date(start_date);
    //     const endDateConverted = new Date(end_date)
    //     startDateConverted.setUTCHours(0, 0, 0, 0)
    //     endDateConverted.setUTCHours(23, 59, 59, 999)
        
    //     const transactions = await TransactionRepository.find({
    //         where: {
    //             createdAt: Between(startDateConverted, endDateConverted),
    //             // debitedAccount: account,
    //             // creditedAccount: account
    //         }
    //     })

    //     const findAccount = await AccountRepository.find({
    //         where: {
    //             id: accountId,
    //             cashIn: Between(startDateConverted, endDateConverted)
    //         },
    //         relations: {
    //             cashIn: {
    //                 debitedAccount: true,
    //             },
    //             user: true
    //         },
    //         select: {
    //             id: true,
    //             balance: true
    //         }
    //     })

    //     return res.status(200).json(findAccount)

    // }
}