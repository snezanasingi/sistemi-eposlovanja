import { Cart } from "../entities/Cart";

export interface UserMOdel {
    username: string; 
    password: string; 
    email: string; 
    phone: any;
    orders: string | null;
    carts: Cart[];
    
}