import { AccountRepository } from './../repositories/account.repository';
import { AppError } from './../errors/appError';
import { UserInterface, UserAccountInterface } from '../interfaces/user.interface';
import * as bcrypt from "bcryptjs";
import { UserRepository } from '../repositories/user.repository';
require('dotenv').config();

export const createUserService = async ({username, password}: UserInterface): Promise<UserAccountInterface> =>  {
    // hash da senha
    const hashedPassword = bcrypt.hashSync(password, 10);

    // verifica se o usuário já existe no banco de dados
    const findUser = UserRepository.findByUsername(username);

    if (await findUser) {
        throw new AppError(400, "User already exists");
    }

    const user = UserRepository.create({
            username: username,
            password: hashedPassword
        })

    //A conta só será criada se o usuário for criado com sucesso
    const account = AccountRepository.create({
        balance: 100
    })
    
    user.account = account;

    await AccountRepository.save(account);
    await UserRepository.save(user);

    return user;

}