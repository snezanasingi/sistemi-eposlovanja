import { EntityNotFoundError } from "typeorm";
import { AppDataSource } from "../db";
import { User } from "../entities/User";
import { UserMOdel } from "../models/user.model";
import { check } from "../utils";


const repo = AppDataSource.getRepository(User)

export class UserService { 
    static async getAllUsers() { 
      const data = await repo.find();  
      return check(data); 
    } 

  static async getUserById(userId: number) { 
      const data = await repo.findOneBy({ userId }); 
      return check(data); 
    } 

  static async createUser(model: UserMOdel) { 
    const data = await repo.save({
      username: model.username,
      password: model.password,
      email: model.email,
      phone: model.phone,
      orders: model.orders,
      carts: model.carts

    })
      console.log("User is successfully created")
      return check(data);

    } 

    static async updateUser(id: number, model: UserMOdel) {
      const data = await this.getUserById(id);

      data.username = model.username
      data.password = model.password
      data.email = model.email
      data.phone = model.phone
      data.orders = model.orders
      data.carts = model.carts

      return check(data);

    }

    
    static async deleteUser(userId: number) { 
        try { 
          const data = await this.getUserById(userId); 
          if (!data) { 
            throw new Error("User not found"); 
          } 
          await repo.remove(data); 
          console.log("User is successfully deleted");
          return true; 
        } catch (error) { 
          if (error instanceof EntityNotFoundError) { 
            throw new Error("User not found"); 
          } 
          throw error; 
        } 
      } 

      static async getUserOrders(userId: number) { // ovim treba da vratim sve porudzbine koje user sa datim id-em napravio
        try { 
          const user = await repo.findOneBy({ userId }); 
          if (!user) { 
            throw new Error("User not found"); 
          } 
          return user.orders; 
        } catch (error) { 
          if (error instanceof EntityNotFoundError) { 
            throw new Error("User not found"); 
          } 
          throw error; 
        } 
      } 
  } 