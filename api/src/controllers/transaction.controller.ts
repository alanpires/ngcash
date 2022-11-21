import { createTransactionService, filterTransactionService, getAllTransactions } from '../services/transaction/transaction.service';
import { Request, Response } from "express";

export class TransactionController {
    static create = async (req: Request, res: Response) => {

        /*
            #swagger.tags = ['Transactions']
            #swagger.summary = 'create transaction'
            #swagger.description = 'In this endpoint it will be possible to create a transaction informing the user that he will receive the money and the value.'

            #swagger.parameters['authorization'] = { 
                in: 'header',
                description: 'token'
            }
            
            #swagger.requestBody = {
            description: 'To create a transaction you must inform the username that will receive the money and the amount.',
            required: true,
            schema: { $ref: "#/definitions/TransactionCreate" }
            }
            
            #swagger.responses[200] = {
            description: 'OK',
            schema: {$ref: '#/definitions/TransactionCreated'}
            }
            #swagger.responses[400]
            #swagger.responses[500]
            #swagger.security = [{
               "bearerAuth": []
            }]
        */
        
        const {accountId, username} = req.user;
        const {usernameCashIn, value} = req.body;
        
        const transaction = await createTransactionService(accountId, username, usernameCashIn, value);

        return res.status(200).json(transaction);
    }

    static filterTransactions = async (req: Request, res: Response) => {
        /*
            #swagger.tags = ['Transactions']
            #swagger.summary = 'filter transaction'
            #swagger.description = 'On this endpoint it will be possible to filter a transaction by informing a start date and an end date.'

            #swagger.parameters['authorization'] = { 
                in: 'header',
                description: 'token'
            }
            
            #swagger.requestBody = {
            description: 'To filter a transaction you must inform a start date and an end date, the cashIn and cashOut parameters are optional.',
            required: true,
            schema: { $ref: "#/definitions/TransactionFilter" }
            }

            #swagger.responses[200] = {
            description: 'OK',
            schema: {$ref: '#/definitions/TransactionFiltered'}
            }

            #swagger.responses[400]
            #swagger.responses[500]
            #swagger.security = [{
               "bearerAuth": []
            }]

        */
        const {start_date, end_date, cashIn, cashOut} = req.body;
        const {accountId} = req.user;

        const transactions = await filterTransactionService(accountId, start_date, end_date, cashIn, cashOut);

        return res.status(200).json(transactions);

    }

    static listTransactions = async (req: Request, res: Response) => {
        /*
            #swagger.tags = ['Transactions']
            #swagger.summary = 'list transactions'
            #swagger.description = 'On this endpoint it will be possible to list transactions.'

            #swagger.parameters['authorization'] = { 
                in: 'header',
                description: 'token'
            }

            #swagger.responses[200] = {
            description: 'OK',
            schema: {$ref: '#/definitions/TransactionListed'}
            }

            #swagger.responses[400]
            #swagger.responses[500]
            #swagger.security = [{
               "bearerAuth": []
            }]

        */
        const {accountId} = req.user;

        const transactions = await getAllTransactions(accountId);

        return res.status(200).json(transactions);

    }

}

