import { Router } from "express";
import { handleRequest } from "../utils";
import { CartService } from "../services/cart.service";

export const CartRoute = Router()

CartRoute.get('/', (req, res) => {
        handleRequest(res, CartService.getAllOrders())
   
})

CartRoute.get('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, CartService.getCartById(id))
})

CartRoute.post('/', (req,res) => {
    handleRequest(res, CartService.createCart(req.body))
})

CartRoute.put('/:id', (req,res) => {
    const id = req.params.id as any as number
    handleRequest(res, CartService.updateCart(id, req.body))
})

CartRoute.delete('/:id', (req,res) => {
    const id = req.params.id as any as number
    handleRequest(res, CartService.deleteCart(id))
})