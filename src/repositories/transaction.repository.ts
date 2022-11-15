import { Transaction } from "../entities/transaction.entity";
import { AppDataSource } from "../data-source";

export const TransactionRepository = AppDataSource.getRepository(Transaction);