import { Cart } from "../entities/Cart";

export interface UserModel {
    userId: number;
    username: string; 
    password: string; 
    email: string; 
    phone: string | null;
   // orders: string | null;
    carts: Cart[];
    
}