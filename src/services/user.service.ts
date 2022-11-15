import { AccountRepository } from './../repositories/account.repository';
import { AppError } from './../errors/appError';
import { UserInterface, ReturnUserInterface } from '../interfaces/user.interface';
import * as bcrypt from "bcryptjs";
import { UserRepository } from '../repositories/user.repository';
import jwt from "jsonwebtoken";
require('dotenv').config();

export const createUserService = async ({username, password}: UserInterface): Promise<ReturnUserInterface> =>  {
    // hash da senha
    const hashedPassword = bcrypt.hashSync(password, 10);

    // verifica se o usuário já existe no banco de dados
    const findUser = UserRepository.findOne({
        relations: {
            account: true
        },
        where: {
            username: username
        }
    })

    if (await findUser) {
        throw new AppError(400, "User already exists");
    }

    const account = AccountRepository.create({
        balance: 100
    })

    await AccountRepository.save(account);

    const userSaved = UserRepository.create({
        username: username,
        password: hashedPassword,
        account: account
    })

    await UserRepository.save(userSaved);

    const user = {
        id: userSaved.id,
        username: userSaved.username,
        account: userSaved.account
    }

    return user;

}

export const loginService = async ({username, password}: UserInterface) => {

    const user = await UserRepository.findOne({
        select: {
            id: true,
            username: true,
            password: true,
        },
        where: {
            username: username
        },
        relations: {
            account: true
        },
    });

    if (!user) {
        throw new AppError(400, "Invalid Credentials");
    };

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
        throw new AppError(400, "Invalid Credentials")
    }

    const token = jwt.sign(
        {
            id: user.id, 
            username: user.username,
            accountId: user.account.id
        }, 
        process.env.SECRET_KEY as string, 
        {expiresIn: process.env.EXPIRES_IN});

    return token;

}