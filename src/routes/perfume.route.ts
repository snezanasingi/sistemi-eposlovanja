import { Router } from "express";
import { handleRequest } from "../utils";
import { PerfumeService } from "../services/perfume.service";

export const PerfumeRoute = Router()

PerfumeRoute.get('/', (req, res) => {
        handleRequest(res, PerfumeService.getAllPerfumes())
   
})

PerfumeRoute.get('/:id', (req, res) => {
        const id = req.params.id as any as number
        handleRequest(res, PerfumeService.getPerfumeById(id))
})

PerfumeRoute.get('/:brand', (req, res) => {
        const brand = req.params.brand as any as string
        handleRequest(res, PerfumeService.getByBrand(brand))
})

PerfumeRoute.get('/:name', (req, res) => {
        const name = req.params.name as any as string
        handleRequest(res, PerfumeService.getByName(name))
})

PerfumeRoute.get('/:price', (req, res) => {
        const price = req.params.price as any 
        handleRequest(res, PerfumeService.getByPrice(price))
})

PerfumeRoute.post('/', (req,res) => {
        handleRequest(res, PerfumeService.createPerfume(req.body))
})

PerfumeRoute.put('/:id', (req,res) => {
        const id = req.params.id as any as number
        handleRequest(res, PerfumeService.updatePerfume(id, req.body))
})

PerfumeRoute.delete('/:id', (req,res) => {
        const id = req.params.id as any as number
        handleRequest(res, PerfumeService.deletePerfume(id))
})