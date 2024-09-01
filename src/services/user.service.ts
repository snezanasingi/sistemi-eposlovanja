import { EntityNotFoundError } from "typeorm";
import { AppDataSource } from "../db";
import { User } from "../entities/User";
import { UserModel } from "../models/user.model";
import { check } from "../utils";
import { config, configDotenv } from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const repo = AppDataSource.getRepository(User);

configDotenv();
const accessSecret = process.env.ACCESS_TOKEN_SECRET;
const accessExpire = process.env.ACCESS_TOKEN_TTL;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
const refreshExpire = process.env.REFRESH_TOKEN_TTL;

export class UserService {
  static async getAllUsers() {
    const data = await repo.find();  
    return check(data); 
  }

  static async getUserById(userId: number) {
    const data = await repo.findOne({
      where: { userId },
      relations: ["carts"], 
    });
    return check(data); 
  }

  static async createUser(model: UserModel) { 
    const hashedPassword = await bcrypt.hash(model.password, 12);
    const data = await repo.save({
      username: model.username,
      password: hashedPassword,
      email: model.email,
      phone: model.phone,
      carts: model.carts 
    });
    return check(data);
  }

  static async updateUser(id: number, model: UserModel) {
    const data = await this.getUserById(id);

    data.username = model.username;
    data.password = model.password ? await bcrypt.hash(model.password, 12) : data.password;
    data.email = model.email;
    data.phone = model.phone;
   // data.carts = model.carts; 
    const user = await repo.save(data);
    return check(user);
    //return check(await repo.save(data)); 
 
 }


  static async deleteUser(userId: number) { 
    try { 
      const data = await this.getUserById(userId); 
      if (!data) { 
        throw new Error("User not found"); 
      } 
      await repo.remove(data); 
      return true; 
    } catch (error) { 
      if (error instanceof EntityNotFoundError) { 
        throw new Error("User not found"); 
      } 
      throw error; 
    } 
  }

  static async getUserOrders(userId: number) { 
    try { 
      const user = await repo.findOne({
        where: { userId },
        relations: ["carts"], 
      });
      if (!user) { 
        throw new Error("User not found"); 
      } 
      return user.carts; // Vraća sve carts (porudžbine) korisnika
    } catch (error) { 
      if (error instanceof EntityNotFoundError) { 
        throw new Error("User not found"); 
      } 
      throw error; 
    } 
  }

  static async login(model: UserModel) {
    const user = await repo.findOne({
      where: { username: model.username }
    });
    
    if (!user) throw new Error("User not found");
    
    const matches = await bcrypt.compare(model.password, user.password);
    
    if (matches) {
      return {
        userId: user.userId,
        username: user.username,
        access: jwt.sign({ name: user.username }, accessSecret, { expiresIn: accessExpire }),
        refresh: jwt.sign({ name: user.username, userId: user.userId }, refreshSecret, { expiresIn: refreshExpire })
      };
    }
    
    throw new Error("BAD_CREDENTIALS");
  }

  static async refreshToken(refresh: string) {
    try {
      const decoded: any = jwt.verify(refresh, refreshSecret as string);
      return {
        userId: decoded.userId,
        username: decoded.name,
        access: jwt.sign({ name: decoded.name }, accessSecret, { expiresIn: accessExpire }),
        refresh
      };
    } catch (err) {
      throw new Error('REFRESH_FAILED');
    }
  }
}
