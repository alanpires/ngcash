import { AccountRepository } from "../repositories/account.repository"

export const findAccountService = async (accountId: string) => {

    const findAccount = await AccountRepository.findOne({
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

    return findAccount
}