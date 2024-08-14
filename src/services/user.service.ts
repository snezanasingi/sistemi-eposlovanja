import { EntityNotFoundError } from "typeorm";
import { AppDataSource } from "../db";
import { User } from "../entities/User";


const repo = AppDataSource.getRepository(User)

export class UserService { 
    static async getAllUsers() { 
      const data = await repo.find();  
      return data; 
    } 

  static async getUserById(userId: number) { 
      const user = await repo.findOneBy({ userId }); 
      return user; 
    } 

  static async createUser(userData: { 
      username: string; 
      password: string; 
      email: string; 
      phone: any; 

    }) {
       
      const user = repo.create(userData); 
      await repo.save(user); 
      console.log("User is successfully created")
      return user; 
    } 

    static async updateUser(userId: number, updatedData: Partial<User>) { 
        try { 
          const user = await repo.findOneBy({ userId }); 
          if (!user) { 
            throw new Error("User not found"); 
          } 
          repo.merge(user, updatedData); 
          await repo.save(user); 
          console.log("User is successfully updated");
          return user; 
        } catch (error) { 
          if (error instanceof EntityNotFoundError) { 
            throw new Error("User not found"); 
          } 
          throw error; 
        } 
      } 

    static async deleteUser(userId: number) { 
        try { 
          const user = await repo.findOneBy({ userId }); 
          if (!user) { 
            throw new Error("User not found"); 
          } 
          await repo.remove(user); 
          console.log("User is successfully deleted");
          return true; 
        } catch (error) { 
          if (error instanceof EntityNotFoundError) { 
            throw new Error("User not found"); 
          } 
          throw error; 
        } 
      } 
  } 