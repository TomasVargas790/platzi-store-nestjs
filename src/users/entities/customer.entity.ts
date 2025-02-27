import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Order } from './order.entity';

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: '255' })
    firstName: string;

    @Column({ type: 'varchar', length: '255' })
    lastName: string;

    @Column({ type: 'varchar', length: '255' })
    phone: string;

    @OneToOne(() => User, (user) => user.customer, { nullable: true })
    user: User;

    @OneToMany(() => Order, (order) => order.customer)
    orders: Order[];

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
