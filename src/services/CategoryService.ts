import { Category } from "../entities/Category";
import { AppDataSource } from "../database/data-source";
import { Repository } from "typeorm";

export class CategoryService {
    private categoryRepository: Repository<Category>;

    constructor() {
        // Usa diretamente o AppDataSource inicializado
        this.categoryRepository = AppDataSource.getRepository(Category);
    }
    async create(name: string, description?: string): Promise<Category> {
        try {
            const category = new Category();
            category.name = name;
            category.description = description || null;

            return await this.categoryRepository.save(category);
        } catch (error) {
            this.handleError(error, "criar categoria no serviço");
            throw error;
        }
    }

    async listAll(): Promise<Category[]> {
        try {
            return await this.categoryRepository.find();
        } catch (error) {
            this.handleError(error, "listar categorias no serviço");
            throw error;
        }
    }

    async findById(id: number): Promise<Category | undefined> {
        try {
            const category = await this.categoryRepository.findOne({ where: { id } });
            return category || undefined;
        } catch (error) {
            this.handleError(error, "buscar categoria por ID no serviço");
            throw error;
        }
    }

    async update(id: number, name: string, description?: string): Promise<Category | undefined> {
        try {
            const category = await this.categoryRepository.findOne({ where: { id } });
            if (!category) return undefined;

            category.name = name;
            category.description = description || null;

            return await this.categoryRepository.save(category);
        } catch (error) {
            this.handleError(error, "atualizar categoria no serviço");
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const category = await this.categoryRepository.findOne({ where: { id } });
            if (!category) return false;

            await this.categoryRepository.remove(category);
            return true;
        } catch (error) {
            this.handleError(error, "remover categoria no serviço");
            throw error;
        }
    }

    private handleError(error: unknown, context: string): void {
        if (error instanceof Error) {
            console.error(`Erro ao ${context}:`, error.message);
        } else {
            console.error(`Erro desconhecido ao ${context}`);
        }
    }
}