import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import { router } from "./router";

import "./database";
const app = express();

app.use(express.json());
app.use(router);
app.use((err: Error, request: Request, response: Response, next: NextFunction)=>{
    if(err instanceof Error){
        return response.status(400).json({
            error:err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error",
    })

})

app.listen(3000,()=>console.log("Server is running"));

/**
 * GET  => BUSCAR INFO
 * POST => INSERIR INFO
 * PUT => ALTERAR INFO
 * DELETE => EXCLUIR INFO
 * PATCH =>ALTERAR INFORMAÇÃO ESPECÍFICA
 */

/**
 * Tipos de parâmetros
 * Routes Params => http://localhost::3000/produtos/4512318453123
 * Query Params => http://localhost:3000/produtos?name=teclado&description=tecladobom&
 * Body Params => {
 *  "name": "teclado",
 *  "description": "teclado bom"
 * }
 */
/*
app.get("/test",(request, response)=>{
    return response.send("Olá NLW");
})

app.post("/test-post", (request, response)=>{
    return response.send("Olá NLW método POST");

})
*/

