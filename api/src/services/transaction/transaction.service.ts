import { Account } from '../../entities/account.entity';
import { TransactionRepository } from '../../repositories/transaction.repository';
import { AppError } from '../../errors/appError';
import { UserRepository } from '../../repositories/user.repository';
import { AccountRepository } from '../../repositories/account.repository';
import { convertedDateService } from '../util/convertedDate.service';

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

export const filterTransactionService = async (accountId: string, start_date: string, end_date: string, cashIn?: boolean, cashOut?: boolean) => {
    
    const account = await AccountRepository.findByIdWhithoutRelations(accountId) as Account;

    const {startDateConverted, endDateConverted} = convertedDateService(start_date, end_date);

    const transactionsCashOut = await TransactionRepository.findCashOutByDate(account, startDateConverted, endDateConverted);
    const transactionsCashIn = await TransactionRepository.findCashInByDate(account, startDateConverted, endDateConverted);

    const allTransactions = [];

    for (let i = 0; i < transactionsCashOut.length; i++) {
        allTransactions.push(transactionsCashOut[i])
    }

    for (let i = 0; i < transactionsCashIn.length; i++) {
        allTransactions.push(transactionsCashIn[i])
    }

    allTransactions.sort((a, b) => {
        return a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0;
    })

    if (cashOut && !cashIn) {
        return {cashOut: transactionsCashOut}
    } else if (cashIn && !cashOut) {
        return {cashIn: transactionsCashIn}
    } else {
        return allTransactions
    }
}

export const getAllTransactions = async (accountId: string) => {
    
    const account = await AccountRepository.findByIdWhithoutRelations(accountId) as Account;

    const allTransactions = [];

    const transactionsCashOut = await TransactionRepository.findCashOut(account);
    const transactionsCashIn = await TransactionRepository.findCashIn(account);

    for (let i = 0; i < transactionsCashOut.length; i++) {
        allTransactions.push(transactionsCashOut[i])
    }

    for (let i = 0; i < transactionsCashIn.length; i++) {
        allTransactions.push(transactionsCashIn[i])
    }

    return allTransactions
}