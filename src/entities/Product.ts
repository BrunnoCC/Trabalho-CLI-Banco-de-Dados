import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column("text", { nullable: true })  // Alterado para tipo "text" explícito
    description: string | null;  // Garanta que está tipado como string ou null

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column('int')
    quantity: number;

    @ManyToOne(() => Category, (category) => category.products)
    category: Category;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}