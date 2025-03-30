import "reflect-metadata";
import { AppDataSource } from "./database/data-source";
import { AppCLI } from "./cli/AppCLI";

async function main() {
    try {
        // Inicializa a conexão primeiro
        await AppDataSource.initialize();
        console.log("Banco de dados conectado com sucesso!");

        // Aguarda 1 segundo para garantir a inicialização completa
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Só então cria a aplicação CLI
        const app = new AppCLI();
        app.start();
    } catch (error) {
        console.error("Erro ao iniciar a aplicação:", error);
        process.exit(1);
    }
}

// Garante que o código aguarde a inicialização completa
main().catch(error => console.error("Erro fatal:", error));