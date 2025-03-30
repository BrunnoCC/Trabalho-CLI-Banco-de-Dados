import { Product } from "../entities/Product";
import { AppDataSource } from "../database/data-source";
import { Repository } from "typeorm";
import { Category } from "../entities/Category";

export class ProductService {
    private productRepository: Repository<Product>;
    private categoryRepository: Repository<Category>;

    constructor() {
        this.productRepository = AppDataSource.getRepository(Product);
        this.categoryRepository = AppDataSource.getRepository(Category);
    }

    private handleError(error: unknown, context: string): void {
        if (error instanceof Error) {
            console.error(`Erro ao ${context}:`, error.message);
        } else {
            console.error(`Erro desconhecido ao ${context}`);
        }
    }

    async create(
        name: string,
        price: number,
        quantity: number,
        categoryId: number,
        description?: string
    ): Promise<Product | undefined> {
        try {
            const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
            if (!category) return undefined;

            const product = new Product();
            product.name = name;
            product.description = description || null;
            product.price = price;
            product.quantity = quantity;
            product.category = category;

            return await this.productRepository.save(product);
        } catch (error) {
            this.handleError(error, "criar produto no serviço");
            throw error;
        }
    }

    async listAll(): Promise<Product[]> {
        try {
            return await this.productRepository.find({ relations: ["category"] });
        } catch (error) {
            this.handleError(error, "listar produtos no serviço");
            throw error;
        }
    }

    async findById(id: number): Promise<Product | undefined> {
        try {
            const product = await this.productRepository.findOne({
                where: { id },
                relations: ["category"]
            });
            return product || undefined;
        } catch (error) {
            this.handleError(error, "buscar produto por ID no serviço");
            throw error;
        }
    }

    async findByCategory(categoryId: number): Promise<Product[]> {
        try {
            return await this.productRepository.find({
                where: { category: { id: categoryId } },
                relations: ["category"]
            });
        } catch (error) {
            this.handleError(error, "buscar produtos por categoria no serviço");
            throw error;
        }
    }

    async update(
        id: number,
        name: string,
        price: number,
        quantity: number,
        categoryId: number,
        description?: string
    ): Promise<Product | undefined> {
        try {
            const product = await this.productRepository.findOne({ where: { id } });
            if (!product) return undefined;

            const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
            if (!category) return undefined;

            product.name = name;
            product.description = description || null;
            product.price = price;
            product.quantity = quantity;
            product.category = category;

            return await this.productRepository.save(product);
        } catch (error) {
            this.handleError(error, "atualizar produto no serviço");
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const product = await this.productRepository.findOne({ where: { id } });
            if (!product) return false;

            await this.productRepository.remove(product);
            return true;
        } catch (error) {
            this.handleError(error, "remover produto no serviço");
            throw error;
        }
    }
}