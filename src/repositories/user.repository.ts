import { User } from "../entities/user.entity";
import { AppDataSource } from "../data-source";

export const UserRepository = AppDataSource.getRepository(User);