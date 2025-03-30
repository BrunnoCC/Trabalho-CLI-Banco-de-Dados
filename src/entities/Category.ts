import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column("text", { nullable: true })  // Alterado para tipo "text" explícito
    description: string | null;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}