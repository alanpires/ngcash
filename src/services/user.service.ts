import { AppError } from './../errors/appError';
import { CreateUserInterface, ReturnUserInterface } from './../interfaces/createUserInterface';
import * as bcrypt from "bcryptjs";
import { UserRepository } from '../repositories/user.repository';


export const createUserService = async ({username, password}: CreateUserInterface): Promise<ReturnUserInterface> =>  {
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