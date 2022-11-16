import { AppError } from './../errors/appError';
import { AccountRepository } from './../repositories/account.repository';
import { TransactionRepository } from './../repositories/transaction.repository';
import { createTransactionService } from './../services/transaction.service';
import { Request, Response } from "express";
import {Equal, Between, MoreThan, LessThan} from "typeorm";
import { addYears, subYears } from 'date-fns';

export class TransactionController {
    static create = async (req: Request, res: Response) => {
        const {accountId, username} = req.user;
        const {usernameCashIn, value} = req.body;

        // Buscando a conta do usuário logado
        
        const transaction = await createTransactionService(accountId, username, usernameCashIn, value);

        return res.status(200).json(transaction);
    }

    static filterTransactions = async (req: Request, res: Response) => {
        const {start_date, end_date, cashIn, cashOut} = req.body;
        const {accountId} = req.user;

        const account = await AccountRepository.findOneBy({
            id: accountId
        })

        if (!account) {
            throw new AppError(500, "Internal server error")
        }

        //Convertendo a data informada pelo usuário, pois o TypeORM faz a busca baseado no dia
        // e horário
        const startDateConverted = new Date(start_date);
        const endDateConverted = new Date(end_date)
        startDateConverted.setUTCHours(0, 0, 0, 0)
        endDateConverted.setUTCHours(23, 59, 59, 999)
        
        const allTransactions: any = {
            cashIn: [],
            cashOut: []
        }

        const transactionsCashOut = await TransactionRepository.find({
            where: {
                createdAt: Between(startDateConverted, endDateConverted),
                debitedAccount: account,
            },
            relations: {
                creditedAccount: true
            }
        })

        const transactionsCashIn = await TransactionRepository.find({
            where: {
                createdAt: Between(startDateConverted, endDateConverted),
                creditedAccount: account
            },
            relations: {
                debitedAccount: true
            }
        })

        allTransactions.cashOut.push(transactionsCashOut);
        allTransactions.cashIn.push(transactionsCashIn);

        if (cashOut && !cashIn) {
            return res.status(200).json(transactionsCashOut)
        } else if (cashIn && !cashOut) {
            return res.status(200).json(transactionsCashIn)
        } else {
            return res.status(200).json(allTransactions)
        }
    }
}