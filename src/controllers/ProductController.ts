import { ProductService } from "../services/ProductService";

export class ProductController {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    async create(name: string, price: number, quantity: number, categoryId: number, description?: string) {
        try {
            const product = await this.productService.create(name, price, quantity, categoryId, description);
            if (product) {
                console.log("Produto criado com sucesso:", product);
            } else {
                console.log("Categoria não encontrada");
            }
        } catch (error) {
            this.handleError(error, "criar produto");
        }
    }

    async listAll() {
        try {
            const products = await this.productService.listAll();
            console.log("Produtos:", products);
        } catch (error) {
            this.handleError(error, "listar produtos");
        }
    }

    async findById(id: number) {
        try {
            const product = await this.productService.findById(id);
            if (product) {
                console.log("Produto encontrado:", product);
            } else {
                console.log("Produto não encontrado");
            }
        } catch (error) {
            this.handleError(error, "buscar produto por ID");
        }
    }

    async findByCategory(categoryId: number) {
        try {
            const products = await this.productService.findByCategory(categoryId);
            console.log("Produtos da categoria:", products);
        } catch (error) {
            this.handleError(error, "buscar produtos por categoria");
        }
    }

    async update(
        id: number,
        name: string,
        price: number,
        quantity: number,
        categoryId: number,
        description?: string
    ) {
        try {
            const product = await this.productService.update(id, name, price, quantity, categoryId, description);
            if (product) {
                console.log("Produto atualizado com sucesso:", product);
            } else {
                console.log("Produto ou categoria não encontrados");
            }
        } catch (error) {
            this.handleError(error, "atualizar produto");
        }
    }

    async delete(id: number) {
        try {
            const success = await this.productService.delete(id);
            if (success) {
                console.log("Produto removido com sucesso");
            } else {
                console.log("Produto não encontrado");
            }
        } catch (error) {
            this.handleError(error, "remover produto");
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