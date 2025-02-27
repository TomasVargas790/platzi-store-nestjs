import { Product } from 'src/products/entities';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    quantity: number;

    @ManyToOne(() => Product)
    product: Product;

    @ManyToOne(() => Order, (order) => order.items)
    order: Order;

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
