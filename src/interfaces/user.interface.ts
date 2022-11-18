import { AccountInterface } from './account.interface';
export interface UserInterface {
    username: string,
    password: string
}

export interface ReturnUserInterface {
    username: string
}

export interface UserAccountInterface {
    id: string,
    username: string,
    password: string,
    account: AccountInterface
}