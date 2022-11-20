import { User } from "../entities/user.entity";
import { AppDataSource } from "../data-source";

export const UserRepository = AppDataSource.getRepository(User).extend({
    findByUsername(username: string) {
        return this.findOne({
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
        })
    },

    // findByUsername2(username: string) {
    //     return this.findOne({
    //         where: {
    //             username: username
    //         }
    //     })
    // }

});