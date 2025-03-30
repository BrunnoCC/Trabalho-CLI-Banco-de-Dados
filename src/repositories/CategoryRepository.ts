import { EntityRepository, Repository } from "typeorm";
import { Category } from "../entities/Category";

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
    async findByName(name: string): Promise<Category | undefined> {
        const category = await this.findOne({ where: { name } });
        return category || undefined;
    }

    async findById(id: number): Promise<Category | undefined> {
        const category = await this.findOne({ where: { id } });
        return category || undefined;
    }
}