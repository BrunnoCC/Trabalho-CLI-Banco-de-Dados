import * as readline from "readline";
import { CategoryController } from "../controllers/CategoryController";
import { ProductController } from "../controllers/ProductController";

export class AppCLI {
    private rl: readline.Interface;
    private categoryController: CategoryController;
    private productController: ProductController;

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        this.categoryController = new CategoryController();
        this.productController = new ProductController();
    }

    start() {
        this.showMainMenu();
    }

    private showMainMenu() {
        console.log("\n=== MENU PRINCIPAL ===");
        console.log("1. Gerenciar Categorias");
        console.log("2. Gerenciar Produtos");
        console.log("0. Sair");

        this.rl.question("Escolha uma opção: ", (answer) => {
            try {
                switch (answer) {
                    case "1":
                        this.showCategoryMenu();
                        break;
                    case "2":
                        this.showProductMenu();
                        break;
                    case "0":
                        this.rl.close();
                        break;
                    default:
                        console.log("Opção inválida!");
                        this.showMainMenu();
                }
            } catch (error) {
                this.handleError(error, "processar menu principal");
                this.showMainMenu();
            }
        });
    }

    private showCategoryMenu() {
        console.log("\n=== MENU CATEGORIAS ===");
        console.log("1. Criar Categoria");
        console.log("2. Listar Categorias");
        console.log("3. Buscar Categoria por ID");
        console.log("4. Atualizar Categoria");
        console.log("5. Remover Categoria");
        console.log("0. Voltar");

        this.rl.question("Escolha uma opção: ", (answer) => {
            try {
                switch (answer) {
                    case "1":
                        this.createCategory();
                        break;
                    case "2":
                        this.categoryController.listAll();
                        this.showCategoryMenu();
                        break;
                    case "3":
                        this.findCategoryById();
                        break;
                    case "4":
                        this.updateCategory();
                        break;
                    case "5":
                        this.deleteCategory();
                        break;
                    case "0":
                        this.showMainMenu();
                        break;
                    default:
                        console.log("Opção inválida!");
                        this.showCategoryMenu();
                }
            } catch (error) {
                this.handleError(error, "processar menu de categorias");
                this.showCategoryMenu();
            }
        });
    }

    private showProductMenu() {
        console.log("\n=== MENU PRODUTOS ===");
        console.log("1. Criar Produto");
        console.log("2. Listar Produtos");
        console.log("3. Buscar Produto por ID");
        console.log("4. Buscar Produtos por Categoria");
        console.log("5. Atualizar Produto");
        console.log("6. Remover Produto");
        console.log("0. Voltar");

        this.rl.question("Escolha uma opção: ", (answer) => {
            try {
                switch (answer) {
                    case "1":
                        this.createProduct();
                        break;
                    case "2":
                        this.productController.listAll();
                        this.showProductMenu();
                        break;
                    case "3":
                        this.findProductById();
                        break;
                    case "4":
                        this.findProductsByCategory();
                        break;
                    case "5":
                        this.updateProduct();
                        break;
                    case "6":
                        this.deleteProduct();
                        break;
                    case "0":
                        this.showMainMenu();
                        break;
                    default:
                        console.log("Opção inválida!");
                        this.showProductMenu();
                }
            } catch (error) {
                this.handleError(error, "processar menu de produtos");
                this.showProductMenu();
            }
        });
    }

    private createCategory() {
        this.rl.question("Nome da categoria: ", (name) => {
            this.rl.question("Descrição (opcional): ", (description) => {
                try {
                    this.categoryController.create(name, description || undefined);
                } catch (error) {
                    this.handleError(error, "criar categoria via CLI");
                }
                this.showCategoryMenu();
            });
        });
    }

    private findCategoryById() {
        this.rl.question("ID da categoria: ", (id) => {
            try {
                const numericId = parseInt(id);
                if (isNaN(numericId)) {
                    console.log("ID deve ser um número");
                } else {
                    this.categoryController.findById(numericId);
                }
            } catch (error) {
                this.handleError(error, "buscar categoria por ID via CLI");
            }
            this.showCategoryMenu();
        });
    }

    private updateCategory() {
        this.rl.question("ID da categoria: ", (id) => {
            const numericId = parseInt(id);
            if (isNaN(numericId)) {
                console.log("ID deve ser um número");
                this.showCategoryMenu();
                return;
            }

            this.rl.question("Novo nome: ", (name) => {
                this.rl.question("Nova descrição (opcional): ", (description) => {
                    try {
                        this.categoryController.update(numericId, name, description || undefined);
                    } catch (error) {
                        this.handleError(error, "atualizar categoria via CLI");
                    }
                    this.showCategoryMenu();
                });
            });
        });
    }

    private deleteCategory() {
        this.rl.question("ID da categoria: ", (id) => {
            try {
                const numericId = parseInt(id);
                if (isNaN(numericId)) {
                    console.log("ID deve ser um número");
                } else {
                    this.categoryController.delete(numericId);
                }
            } catch (error) {
                this.handleError(error, "remover categoria via CLI");
            }
            this.showCategoryMenu();
        });
    }

    private createProduct() {
        this.rl.question("Nome do produto: ", (name) => {
            this.rl.question("Preço: ", (price) => {
                this.rl.question("Quantidade: ", (quantity) => {
                    this.rl.question("ID da categoria: ", (categoryId) => {
                        this.rl.question("Descrição (opcional): ", (description) => {
                            try {
                                const numericPrice = parseFloat(price);
                                const numericQuantity = parseInt(quantity);
                                const numericCategoryId = parseInt(categoryId);

                                if (isNaN(numericPrice)) throw new Error("Preço inválido");
                                if (isNaN(numericQuantity)) throw new Error("Quantidade inválida");
                                if (isNaN(numericCategoryId)) throw new Error("ID de categoria inválido");

                                this.productController.create(
                                    name,
                                    numericPrice,
                                    numericQuantity,
                                    numericCategoryId,
                                    description || undefined
                                );
                            } catch (error) {
                                this.handleError(error, "criar produto via CLI");
                            }
                            this.showProductMenu();
                        });
                    });
                });
            });
        });
    }

    private findProductById() {
        this.rl.question("ID do produto: ", (id) => {
            try {
                const numericId = parseInt(id);
                if (isNaN(numericId)) {
                    console.log("ID deve ser um número");
                } else {
                    this.productController.findById(numericId);
                }
            } catch (error) {
                this.handleError(error, "buscar produto por ID via CLI");
            }
            this.showProductMenu();
        });
    }

    private findProductsByCategory() {
        this.rl.question("ID da categoria: ", (id) => {
            try {
                const numericId = parseInt(id);
                if (isNaN(numericId)) {
                    console.log("ID deve ser um número");
                } else {
                    this.productController.findByCategory(numericId);
                }
            } catch (error) {
                this.handleError(error, "buscar produtos por categoria via CLI");
            }
            this.showProductMenu();
        });
    }

    private updateProduct() {
        this.rl.question("ID do produto: ", (id) => {
            const numericId = parseInt(id);
            if (isNaN(numericId)) {
                console.log("ID deve ser um número");
                this.showProductMenu();
                return;
            }

            this.rl.question("Novo nome: ", (name) => {
                this.rl.question("Novo preço: ", (price) => {
                    const numericPrice = parseFloat(price);
                    if (isNaN(numericPrice)) {
                        console.log("Preço inválido");
                        this.showProductMenu();
                        return;
                    }

                    this.rl.question("Nova quantidade: ", (quantity) => {
                        const numericQuantity = parseInt(quantity);
                        if (isNaN(numericQuantity)) {
                            console.log("Quantidade inválida");
                            this.showProductMenu();
                            return;
                        }

                        this.rl.question("Novo ID da categoria: ", (categoryId) => {
                            const numericCategoryId = parseInt(categoryId);
                            if (isNaN(numericCategoryId)) {
                                console.log("ID de categoria inválido");
                                this.showProductMenu();
                                return;
                            }

                            this.rl.question("Nova descrição (opcional): ", (description) => {
                                try {
                                    this.productController.update(
                                        numericId,
                                        name,
                                        numericPrice,
                                        numericQuantity,
                                        numericCategoryId,
                                        description || undefined
                                    );
                                } catch (error) {
                                    this.handleError(error, "atualizar produto via CLI");
                                }
                                this.showProductMenu();
                            });
                        });
                    });
                });
            });
        });
    }

    private deleteProduct() {
        this.rl.question("ID do produto: ", (id) => {
            try {
                const numericId = parseInt(id);
                if (isNaN(numericId)) {
                    console.log("ID deve ser um número");
                } else {
                    this.productController.delete(numericId);
                }
            } catch (error) {
                this.handleError(error, "remover produto via CLI");
            }
            this.showProductMenu();
        });
    }

    private handleError(error: unknown, context: string): void {
        if (error instanceof Error) {
            console.error(`Erro ao ${context}:`, error.message);
        } else {
            console.error(`Erro desconhecido ao ${context}`);
        }
    }
}