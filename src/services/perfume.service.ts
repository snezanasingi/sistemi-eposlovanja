import { AppDataSource } from "../db";
import { Perfume } from "../entities/Perfume";
import { EntityNotFoundError } from "typeorm";
import { check } from "../utils";

const repo = AppDataSource.getRepository(Perfume)

export class PerfumeService { 
    static async getAllPerfumes() { 
      const data = await repo.find();  
      return check(data);
    } 

    static async getPerfumeById(perfumeId: number) { 
      const data = await repo.findOneBy({ perfumeId }); 
      return check(data); 
    } 

    static async getByBrand(brand: string) { 
      const data = await repo.find({ 
        where: { brand: brand }
      }); 

      return check(data);   
 }

    static async getByName(name: string) { 
      const data = await repo.find({ 
        where: { name: name }
      }); 

    return check(data); 
    } 

    static async getByPrice(price: any) { 
      const data = await repo.find({ 
        where: { price: price }
      }); 
      
      return check(data);
   }

    static async createPerfume(model: Perfume) { 
      const data = await repo.save(model); 
      return check(data);
    } 

    static async updatePerfume(id: number, model: Perfume) { 
      const data = await this.getPerfumeById(id); 
     
      data.name = model.name; 
      data.brand = model.brand; 
      data.price = model.price; 
     
      return await repo.save(data);  
    } 
    
    static async deletePerfume(perfumeId: number) {  
      try {  
        const data = await this.getPerfumeById(perfumeId);  
        if (!data) {  
          throw new Error("Perfume not found");  
        }  
        await repo.remove(data);  
  
        return true;  
      } catch (error) {  
        if (error instanceof EntityNotFoundError) {  
          throw new Error("Perfume not found");  
        }  
        throw error;  
      }                                                                                                                                 
  }

 }