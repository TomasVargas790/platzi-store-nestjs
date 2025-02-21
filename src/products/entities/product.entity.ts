import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';
import { Brand } from './brand.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: '255', unique: true })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'int' })
    price: number;

    @Column({ type: 'int' })
    stock: number;

    @Column({ type: 'varchar' })
    image: string;

    @ManyToOne(() => Brand, (brand) => brand.products)
    brand: Brand;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
}
