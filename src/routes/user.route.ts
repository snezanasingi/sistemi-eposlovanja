import { Router } from "express";
import { UserService } from "../services/user.service";
import { handleRequest } from "../utils";

export const UserRoute = Router()

UserRoute.get('/', (req, res) => {
        handleRequest(res, UserService.getAllUsers())
   
})