import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: '255' })
    email: string;

    @Column({ type: 'varchar', length: '255' })
    password: string;

    @Column({ type: 'varchar', length: '255' })
    role: string;

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

    @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;
}
