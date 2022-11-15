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
    const findUser = UserRepository.findOneBy({
        username: username
    })

    if (await findUser) {
        throw new AppError(400, "User already exists");
    }

    const userSaved = UserRepository.create({
        username: username,
        password: hashedPassword
    })

    await UserRepository.save(userSaved);

    const user = {
        id: userSaved.id,
        username: userSaved.username
    }

    return user;

}

export const loginService = async ({username, password}: UserInterface) => {

    const user = await UserRepository.findOne({
        select: {
            username: true,
            password: true,
        },
        where: {
            username: username
        }
    });

    console.log(user)

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
            username: user.username
        }, 
        process.env.SECRET_KEY as string, 
        {expiresIn: process.env.EXPIRES_IN});

    return token;

}