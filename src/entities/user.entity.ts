import { Account } from './account.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { IsString, MinLength } from "class-validator";
import { PasswordValidator } from "../validators/PasswordValidator";


@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column({unique: true})
    @MinLength(3, {
        message: 'Username must contain at least three characters'
    })
    @IsString()
    username: string

    @Column({select: false})
    @PasswordValidator({message: 'Password must contain at least eight characters, have a number and an uppercase letter.'})
    @IsString()
    password: string

    @OneToOne(() => Account)
    @JoinColumn()
    account: Account
}