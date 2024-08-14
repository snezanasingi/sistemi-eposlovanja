import { AppDataSource } from "../db";
import { Perfume } from "../entities/Perfume";
import { EntityNotFoundError } from "typeorm";

const repo = AppDataSource.getRepository(Perfume)

export class PerfumeService { 
    static async getAllPerfumes() { 
      const data = await repo.find();  
      return data; 
    } 

    static async getByBrand(brand: string) { 
      const perfumes = await repo.find({ 
        where: { brand: brand }
      }); 
      return perfumes; 
    } 

    static async getByName(name: string) { 
      const perfumes = await repo.find({ 
        where: { name: name }
      }); 
      return perfumes; 
    } 

    static async getByPrice(price: any) { 
      const perfumes = await repo.find({ 
        where: { price: price }
      }); 
      return perfumes; 
    } 
 }