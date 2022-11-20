import { User } from './../entities/user.entity';
import { Account } from "../entities/account.entity";
import { AppDataSource } from "../data-source";

export const AccountRepository = AppDataSource.getRepository(Account).extend({
    findById(accountId: string) {
        return this.findOne ({
            where: {
                id: accountId,
            },
            relations: {
                cashIn: {
                    debitedAccount: true,
                },
                cashOut: {
                    creditedAccount: true
                },
                user: true
            },
            select: {
                id: true,
                balance: true
            }
        })
    },

    findByIdWhithoutRelations(id: string) {
        return this.findOne({
            where: {
                id: id,
            },
            select: {
                id: true,
                balance: true
            }
        })
    },

    findByUser(user: User) {
        return this.findOne({
            where: {
                user: user
            },
            select: {
                id: true,
                balance: true
            }
        })
    }
});