import { EntityNotFoundError, In } from "typeorm"; 
import { AppDataSource } from "../db"; 
import { Cart } from "../entities/Cart"; 
import { check } from "../utils";
import { CartModel } from "../models/cart.model";
import { Perfume } from "../entities/Perfume";
import { User } from "../entities/User";

const repo = AppDataSource.getRepository(Cart); 
const userRepo = AppDataSource.getRepository(User);
const perfumeRepo = AppDataSource.getRepository(Perfume);


export class CartService { 
  static async getAllOrders() { 
    const data = await repo.find({ 
      relations: ["perfumes", "user"], 
    }); 
    return check(data);
  } 

  static async getCartById(orderId: number) { 
    const data = await repo.findOneBy({ orderId }); 
    return check(data); 
  } 

static async getByUserId(userId: number) { 
    const data = await repo.find({ 
      where: { 
        user: { 
            userId: userId 
        } }, 

      relations: ["perfumes", "user"], 

    });

    return check(data); 
  } 

  static async createCart(model: CartModel) {
    try {

        const user = await userRepo.findOneBy({ userId: model.userId });
        if (!user) {
            
            throw new Error('User not found');
        }

        const perfumes = await perfumeRepo.findBy({ perfumeId: In(model.perfumeId) });
        if (!perfumes || perfumes.length !== model.perfumeId.length) {
            
            throw new Error('Some perfumes not found');
        }

        const cart = new Cart();
        cart.orderId = model.orderId;
        cart.totalPrice = model.totalPrice.toString(); 
        cart.userId = model.userId;
        cart.user = user;
       // cart.perfumeId = model.perfumeId;
        cart.perfumes = perfumes;
        

        const data = await repo.save(cart);
       
        return check(data);
    } catch (error) {
      
        throw error; 
    }
}

static async deleteCart(orderId: number) { 
    const data = await repo.findOne({ 
      where: { 
        orderId: orderId, 
      }, 
    }); 

if (!data) { 
  throw new EntityNotFoundError(Cart, orderId); 
} 
 
await repo.delete(data); 

} 
}
