import { EntityRepository, Repository } from "typeorm";
import { Product } from "../entities/Product";

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    async findByName(name: string): Promise<Product | undefined> {
        const product = await this.findOne({ where: { name } });
        return product || undefined;
    }

    async findById(id: number): Promise<Product | undefined> {
        const product = await this.findOne({
            where: { id },
            relations: ["category"]
        });
        return product || undefined;
    }

    async findByCategory(categoryId: number): Promise<Product[]> {
        return this.find({
            where: { category: { id: categoryId } },
            relations: ["category"]
        });
    }
}