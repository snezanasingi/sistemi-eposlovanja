import { Router } from "express";
import { handleRequest } from "../utils";
import { CartService } from "../services/cart.service";

export const CartRoute = Router()

CartRoute.get('/', (req, res) => {
        handleRequest(res, CartService.getAllOrders())
   
})

/*CartRoute.get('/cart/:userid', (req, res) => 
{
    const userid = req.params.userid
    handleRequest(res, CartService.getByUserId(userid))
})*/ //hocu da mi izbaci po useru njegov cart