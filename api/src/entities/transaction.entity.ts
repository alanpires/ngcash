import { Account } from './account.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Account, account => account.cashOut)
  debitedAccount: Account;

  @ManyToOne(() => Account, account => account.cashIn)
  creditedAccount: Account;
}
