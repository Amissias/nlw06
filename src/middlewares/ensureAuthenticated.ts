import {Request, Response, NextFunction} from "express";
import { verify } from "jsonwebtoken"

interface IPayload{
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
//Receber o token
const authToken = request.headers.authorization;

//validar se token esta preenchido
if(!authToken){
    return response.status(401).end();
}

const [,token] = authToken.split(" ")

try{
    // validar se token é válido kkkk
    const {sub} = verify(token, "6425ddbf9cd648e1e4d33c4340d3373d") as IPayload;

    
//Recuperar informações do usuário
    request.user_id = sub;
    //const decode = verify(token, "6425ddbf9cd648e1e4d33c4340d3373d");
    //console.log(decode);
    return next();
}catch(err){
    return response.status(401).end();

}




}