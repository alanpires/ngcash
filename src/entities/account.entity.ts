import { User } from './user.entity';
import { Transaction } from './transaction.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";

@Entity("accounts")
export class Account {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column({select: false})
    balance: number

    @OneToMany(() => Transaction, (transaction) => transaction.debitedAccount)
    cashOut: Transaction[]

    @OneToMany(() => Transaction, (transaction) => transaction.creditedAccount)
    cashIn: Transaction[]

    @OneToOne(() => User, (user) => user.account)
    user: User
}