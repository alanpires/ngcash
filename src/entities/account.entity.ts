import { User } from './user.entity';
import { Transaction } from './transaction.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";

@Entity("accounts")
export class Account {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column()
    balance: number

    @OneToMany(() => Transaction, (transaction) => transaction.debitAccount)
    debitedAccounts: Transaction[]

    @OneToMany(() => Transaction, (transaction) => transaction.creditAccount)
    creditedAccounts: Transaction[]

    @OneToOne(() => User, (user) => user.account)
    user: User
}