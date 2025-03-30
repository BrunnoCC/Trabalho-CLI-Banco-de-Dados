import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "../entities/Product";
import { Category } from "../entities/Category";

export const AppDataSource = new DataSource({
    name: "default",
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Calado01@",
    database: "gerenciamento",
    synchronize: true,
    logging: true,
    entities: [Product, Category],
    migrations: [],
    subscribers: [],
});