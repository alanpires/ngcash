import { Account } from "../entities/account.entity";
import { AppDataSource } from "../data-source";

export const AccountRepository = AppDataSource.getRepository(Account);