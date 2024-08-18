import { Router } from "express";
import { UserService } from "../services/user.service";
import { handleRequest } from "../utils";

export const UserRoute = Router()

UserRoute.get('/', (req, res) => {
        handleRequest(res, UserService.getAllUsers())
   
})

UserRoute.get('/:id', (req, res) => {
        const id = req.params.id as any as number
        handleRequest(res, UserService.getUserById(id))
})

UserRoute.get('/:orders', (req, res) => {
        const id = req.params.orders as any as number
        handleRequest(res, UserService.getUserOrders(id))
})

UserRoute.post('/', (req,res) => {
        handleRequest(res, UserService.createUser(req.body))
})

UserRoute.put('/:id', (req,res) => {
        const id = req.params.id as any as number
        handleRequest(res, UserService.updateUser(id, req.body))
})

UserRoute.delete('/:id', (req,res) => {
        const id = req.params.id as any as number
        handleRequest(res, UserService.deleteUser(id))
})