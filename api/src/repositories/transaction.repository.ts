import { AccountInterface } from './../interfaces/account.interface';
import { Transaction } from '../entities/transaction.entity';
import { AppDataSource } from '../data-source';
import { Between } from 'typeorm';

export const TransactionRepository = AppDataSource.getRepository(
  Transaction,
).extend({
  findById(id: string) {
    return this.findOne({
      where: {
        id: id,
      },
      relations: {
        debitedAccount: {
          user: true,
        },
        creditedAccount: {
          user: true,
        },
      },
    });
  },

  findCashOutByDate(account: AccountInterface, startDate: Date, endDate: Date) {
    return this.find({
      where: {
        createdAt: Between(startDate, endDate),
        debitedAccount: account,
      },
      relations: {
        creditedAccount: true,
      },
      order: {
        createdAt: 'ASC',
      },
    });
  },

  findCashInByDate(account: AccountInterface, startDate: Date, endDate: Date) {
    return this.find({
      where: {
        createdAt: Between(startDate, endDate),
        creditedAccount: account,
      },
      relations: {
        debitedAccount: true,
      },
      order: {
        createdAt: 'ASC',
      },
    });
  },

  findCashOut(account: AccountInterface) {
    return this.find({
      where: {
        debitedAccount: account,
      },
      relations: {
        creditedAccount: true,
      },
    });
  },

  findCashIn(account: AccountInterface) {
    return this.find({
      where: {
        creditedAccount: account,
      },
      relations: {
        debitedAccount: true,
      },
    });
  },
});
