// import { EntityNotFoundError } from "typeorm";
// import { AppDataSource } from "../db";
// import { Cart } from "../entities/Cart";

// const repo = AppDataSource.getRepository(Cart)

// export class CartService {
//     static async getAllOrders() {
//         const data = await repo.find()
//         return data;
//     }
// } ovo moram bolje da proverim 
import { EntityNotFoundError } from "typeorm"; 
import { AppDataSource } from "../db"; 
import { Cart } from "../entities/Cart"; 

const cartRepo = AppDataSource.getRepository(Cart); 


export class CartService { 
  static async getAllOrders() { 
    const data = await cartRepo.find({ 
      relations: ["perfume", "user"], 
    }); 
    return data; 
  } 

static async getById(orderId: number) { 
    const cart = await cartRepo.findOne({ 
      where: { 
        orderId: orderId 
    }, 
      relations: ["perfume", "user"], 

    });

    if (!cart) { 

      throw new EntityNotFoundError(Cart, orderId); 

    } 
    return cart; 
  } 

static async getByUserId(userId: number) { 
    const carts = await cartRepo.find({ 
      where: { 
        user: { 
            userId: userId 
        } }, 

      relations: ["perfume", "user"], 

    });

    return carts; 
  } 

static async getByPerfumeId(perfumeId: number) { 
    const carts = await cartRepo.find({ 
      where: {
         perfume: { 
            perfumeId: perfumeId 
        } },

      relations: ["perfume", "user"], 

    });

    return carts; 
  } 

  /*static async createCart(userId: number, perfumeId: number, price: number) {  
    const cart = cartRepo.create({  
      userId: userId, 
      perfumeId: perfumeId, 
      totalPrice: price, ne radi
    });  

    await cartRepo.save(cart);  
    return cart;  
  }*/

static async deleteCart(orderId: number) { 
    const cart = await cartRepo.findOne({ 
      where: { 
        orderId: orderId, 
      }, 
    }); 

if (!cart) { 
  throw new EntityNotFoundError(Cart, orderId); 
} 
 
await cartRepo.delete(cart); 

} 

}
