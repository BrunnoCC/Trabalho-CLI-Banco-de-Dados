import { CategoryService } from "../services/CategoryService";

export class CategoryController {
    private categoryService: CategoryService;

    constructor() {
        this.categoryService = new CategoryService();
    }

    async create(name: string, description?: string) {
        try {
            const category = await this.categoryService.create(name, description);
            console.log("Categoria criada com sucesso:", category);
        } catch (error) {
            this.handleError(error, "criar categoria");
        }
    }

    async listAll() {
        try {
            const categories = await this.categoryService.listAll();
            console.log("Categorias:", categories);
        } catch (error) {
            this.handleError(error, "listar categorias");
        }
    }

    async findById(id: number) {
        try {
            const category = await this.categoryService.findById(id);
            if (category) {
                console.log("Categoria encontrada:", category);
            } else {
                console.log("Categoria não encontrada");
            }
        } catch (error) {
            this.handleError(error, "buscar categoria por ID");
        }
    }

    async update(id: number, name: string, description?: string) {
        try {
            const category = await this.categoryService.update(id, name, description);
            if (category) {
                console.log("Categoria atualizada com sucesso:", category);
            } else {
                console.log("Categoria não encontrada");
            }
        } catch (error) {
            this.handleError(error, "atualizar categoria");
        }
    }

    async delete(id: number) {
        try {
            const success = await this.categoryService.delete(id);
            if (success) {
                console.log("Categoria removida com sucesso");
            } else {
                console.log("Categoria não encontrada");
            }
        } catch (error) {
            this.handleError(error, "remover categoria");
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