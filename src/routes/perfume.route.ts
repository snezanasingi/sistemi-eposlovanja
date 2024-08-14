import { Router } from "express";
import { handleRequest } from "../utils";
import { PerfumeService } from "../services/perfume.service";

export const PerfumeRoute = Router()

PerfumeRoute.get('/', (req, res) => {
        handleRequest(res, PerfumeService.getAllPerfumes())
   
})