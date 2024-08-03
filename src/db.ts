import { configDotenv } from "dotenv";
import { DataSource } from "typeorm";
import { Manufacturer } from "./entities/Manufacturer";
import { Perfumes } from "./entities/Perfumes";
import { User } from "./entities/User";


configDotenv()
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: Number.parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User,Perfumes,Manufacturer],
    logging: false

})