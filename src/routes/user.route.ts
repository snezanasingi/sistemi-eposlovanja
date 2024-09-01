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

// UserRoute.get('/:orders', (req, res) => {
//         const id = req.params.orders as any as number
//         handleRequest(res, UserService.getUserOrders(id))
// })

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

UserRoute.post('/login', (req, res) => {
        handleRequest(res, UserService.login(req.body));
});
    
UserRoute.post('/refresh', (req, res) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
     //   handleRequest(res, UserService.refreshToken(token || '')); da proverim da nije zato doslo do greske da postavi nesto ako nema tokena
        handleRequest(res, UserService.refreshToken(token));
})