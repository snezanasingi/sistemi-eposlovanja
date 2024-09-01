import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { configDotenv } from 'dotenv'
import { AppDataSource } from './db'
import { PerfumeService } from './services/perfume.service'
import { UserRoute } from './routes/user.route'
import { PerfumeRoute } from './routes/perfume.route'
import { CartRoute } from './routes/cart.route'
import { authenticateToken } from './utils'

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

configDotenv()
AppDataSource.initialize().then(() => {
    const port = process.env.SERVER_PORT || 4000
    app.listen(port, () => {
   
    })
}).catch()

app.use(authenticateToken)
//app.use('/api/refresh', LoginRoute)
//app.use('/api/user/login', UserRoute)
app.use('/api/user', UserRoute)
app.use('/api/perfume', PerfumeRoute)
app.use('/api/cart', CartRoute)

app.get('/', async (req,res)=>{

    res.json( await PerfumeService.getByName("Miss Dior")
    )
})

app.get('*', (req,res)=>{

    res.status(404).json({
        message: "Not found!"
    })
})