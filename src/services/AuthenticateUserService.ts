import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { sign } from "jsonwebtoken"

interface IAuthenticateRequest{
    email:string;
    password:string;
}

class AuthenticateUserService{
    async execute({email,password}: IAuthenticateRequest){
        const usersRepositories = getCustomRepository(UsersRepositories);

        const user = await usersRepositories.findOne({
            email
        });

        if(!user) {
            throw new Error("Email/Password incorrect")
        }

        //verificar se a senha está correta
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Email/Password incorrect")

        }
        //gerar token
        //utilizado o MD5 GENERATOR = palavra nlwvaloriza 6425ddbf9cd648e1e4d33c4340d3373d
        const token = sign({
            email: user.email},
            "6425ddbf9cd648e1e4d33c4340d3373d",
            {subject : user.id,
            expiresIn:"1d",
            })

        return token;
    }
}

export {AuthenticateUserService}