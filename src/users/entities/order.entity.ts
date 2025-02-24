import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity';
import { Expose } from 'class-transformer';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Customer, (customer) => customer.orders)
    customer: Customer;

    @OneToMany(() => OrderItem, (item) => item.order)
    items: OrderItem[];

    @Expose()
    get products() {
        if (this.items) {
            return this.items
                .filter((item) => !!item)
                .map(({ product, quantity }) => ({ ...product, quantity }));
        }
        return [];
    }

    @Expose()
    get total() {
        if (this.items) {
            return this.items
                .filter((item) => !!item)
                .reduce(
                    (prev, { product: { price }, quantity }) =>
                        prev + price * quantity,
                    0,
                );
        }
    }

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
