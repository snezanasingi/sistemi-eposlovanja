import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { configDotenv } from 'dotenv'
import { AppDataSource } from './db'
import { UserService } from './services/user.service'
import { PerfumeService } from './services/perfume.service'
import { CartService } from './services/cart.service'
import { UserRoute } from './routes/user.route'
import { PerfumeRoute } from './routes/perfume.route'
import { CartRoute } from './routes/cart.route'

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

configDotenv()
AppDataSource.initialize().then(() => {
    console.log('Connected to database')
    const port = process.env.SERVER_PORT || 4000
    app.listen(port, () => {
    console.log("Listening on port " + port)
    })
}).catch((e) => console.log(e))

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