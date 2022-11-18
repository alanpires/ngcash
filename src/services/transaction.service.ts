import { Account } from './../entities/account.entity';
import { TransactionRepository } from './../repositories/transaction.repository';
import { AppError } from './../errors/appError';
import { UserRepository } from './../repositories/user.repository';
import { AccountRepository } from '../repositories/account.repository';
import { Between } from 'typeorm';

export const createTransactionService = async (accountId: string, usernameCashOut: string, usernameCashIn: string, value: number) => {

    // Buscando a conta do usuário logado
    const findAccountCashOut = await AccountRepository.findByIdWhithoutRelations(accountId) as Account;

    //Verificar se o usuário tem saldo suficiente no início da transação
    const balance = findAccountCashOut?.balance as number;

    if (balance - value < 0) {
        throw new AppError(400, "You do not have enough balance");
    }

    //Buscando usuário que receberá o cashIn
    const findUserCashIn = await UserRepository.findByUsername(usernameCashIn);

    //Caso o usuário não seja encontrado
    if (!findUserCashIn) {
        throw new AppError(400, "User not found.");
    }

    // Buscando a conta do usuário que receberá o cashin
    const findAccountCashIn = await AccountRepository.findByUser(findUserCashIn) as Account;

    //Verificando se o usuário não está realizando uma transferência para si mesmo
    if (usernameCashOut == usernameCashIn) {
        throw new AppError(400, "You cannot transfer to yourself.");
    }
    
    //Criar uma nova transação
    const transactionCreated = TransactionRepository.create({
        value:value,
        debitedAccount: findAccountCashOut,
        creditedAccount: findAccountCashIn
    });

    //Debitar e creditar os valores nas contas
    findAccountCashOut.balance -= value;
    findAccountCashIn.balance += value;
    
    // Salvando os valores
    await TransactionRepository.save(transactionCreated);
    await AccountRepository.save(findAccountCashIn);
    await AccountRepository.save(findAccountCashOut);

    // Buscando a transação atualizada no banco após as atualizações
    const transaction = TransactionRepository.findById(transactionCreated.id);

    return transaction;

}

export const filterTransactionService = async (account: Account, start_date: string, end_date: string, cashIn: boolean, cashOut: boolean) => {
    //Convertendo a data informada pelo usuário, pois o TypeORM faz a busca baseado no dia
    // e horário
    const startDateConverted = new Date(start_date);
    const endDateConverted = new Date(end_date)
    startDateConverted.setUTCHours(0, 0, 0, 0)
    endDateConverted.setUTCHours(23, 59, 59, 999)
        
    const allTransactions: any = {
        cashIn,
        cashOut
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
    
    allTransactions.cashOut = transactionsCashOut;
    allTransactions.cashIn = transactionsCashIn;

    if (cashOut && !cashIn) {
        console.log("aqui")
        return transactionsCashOut
    } else if (cashIn && !cashOut) {
        return transactionsCashIn
    } else {
        return allTransactions
    }
}