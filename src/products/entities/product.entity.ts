import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
    Index,
    JoinColumn,
} from 'typeorm';
import { Brand } from './brand.entity';
import { Category } from './category.entity';

@Index(['stock', 'price'])
@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: '255', unique: true })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Index()
    @Column({ type: 'int' })
    price: number;

    @Column({ type: 'int' })
    stock: number;

    @Column({ type: 'varchar' })
    image: string;

    @ManyToOne(() => Brand, (brand) => brand.products)
    @JoinColumn({ name: 'brand_id' })
    brand: Brand;

    @ManyToMany(() => Category, (category) => category.products)
    @JoinTable({
        name: 'products_categories',
        joinColumn: {
            name: 'product_id',
        },
        inverseJoinColumn: {
            name: 'category_id',
        },
    })
    categories: Category[];

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
}
