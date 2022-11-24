import { UserRepository } from "../../repositories/user.repository";
import { UserInterface } from "../../interfaces/user.interface";
import { AppError } from "../../errors/appError";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginService = async ({username, password}: UserInterface) => {

    const user = await UserRepository.findByUsername(username);

    if (!user) {
        throw new AppError(400, "Invalid Credentials");
    };

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
        throw new AppError(400, "Invalid Credentials")
    }

    const token = jwt.sign(
        {
            userId: user.id,
            username: user.username,
            accountId: user.account.id
        }, 
        process.env.SECRET_KEY as string, 
        {expiresIn: process.env.EXPIRES_IN})

    return {token: token};

}