import { EntityNotFoundError } from "typeorm"; 
import { AppDataSource } from "../db"; 
import { Cart } from "../entities/Cart"; 
import { check } from "../utils";
import { CartModel } from "../models/cart.model";

const repo = AppDataSource.getRepository(Cart); 


export class CartService { 
  static async getAllOrders() { 
    const data = await repo.find({ 
      relations: ["perfume", "user"], 
    }); 
    return check(data);
  } 

  static async getCartById(orderId: number) { 
    const data = await repo.findOneBy({ orderId }); 
    return check(data); 
  } 

// static async getCartById(orderId: number) { 
//     const cart = await cartRepo.findOne({ 
//       where: { 
//         orderId: orderId 
//     }, 
//       relations: ["perfume", "user"], 

//     });

//     if (!cart) { 

//       throw new EntityNotFoundError(Cart, orderId); 

//     } 
//     return cart; 
//   } 

static async getByUserId(userId: number) { 
    const data = await repo.find({ 
      where: { 
        user: { 
            userId: userId 
        } }, 

      relations: ["perfume", "user"], 

    });

    return check(data); 
  } 

static async getByPerfumeId(perfumeId: number) { 
    const data = await repo.find({ 
      where: {
         perfume: { 
            perfumeId: perfumeId 
        } },

      relations: ["perfume", "user"], 

    });

    return check(data); 
  } 

  static async createCart(model: CartModel) {

    const data = await repo.save({
      orderId: model.orderId,
      perfumeId: model.perfumeId,
      totalPrice: model.totalPrice,
      userId: model.userId
    })

    return check(data);
  }

  static async updateCart(id: number, model: CartModel) {
 
      const data = await repo.findOneBy({ orderId: id }); 
    if (!data) { 
        throw new EntityNotFoundError(Cart, id); 
      } 
      data.perfumeId = model.perfumeId; 
      data.totalPrice = model.totalPrice; 
      data.userId = model.userId;  
    
      const updatedCart = await repo.save(data); 
      return check(updatedCart); 
    
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
