import { Account } from './account.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { MinLength } from "class-validator";
import { PasswordValidator } from "../validators/PasswordValidator"

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column({unique: true})
    @MinLength(3, {
        message: 'Username must contain at least three characters'
    })
    username: string

    @Column()
    @PasswordValidator({
        message: 'Password must contain at least eight characters, have a number and an uppercase letter.'
    })
    password: string

    @OneToOne(() => Account)
    @JoinColumn()
    account: Account
}