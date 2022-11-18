import { Transaction } from "../entities/transaction.entity";
import { AppDataSource } from "../data-source";

export const TransactionRepository = AppDataSource.getRepository(Transaction).extend({
    findById(id: string) {
        return this.findOne({
            where: {
                id: id
            },
            relations: {
                debitedAccount: {
                    user: true
                },
                creditedAccount: {
                    user: true,
                }
            }
        })
    }
})