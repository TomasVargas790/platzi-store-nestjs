import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { createUserDTO, updateUserDTO } from 'src/users/dtos/users.dto';
import { Order } from '../entities/order.entity';
import { User } from 'src/users/entities';
import { CustomersService } from './customers.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,

        private customerService: CustomersService,
    ) {}

    findAll() {
        return this.usersRepository.find({
            relations: ['customer'],
        });
    }

    findOne(id: number) {
        const user = this.usersRepository.findOne({
            where: { id },
        });
        if (!user) {
            throw new NotFoundException(`User ${id} not found!`);
        }
        return user;
    }

    async findOrderByUserId(id: number): Promise<Order[]> {
        const user = await this.customerService.findOne(id);
        if (!user) {
            throw new NotFoundException(`User ${id} not found`);
        }

        return await this.ordersRepository.find({
            where: { customer: { id: user.id } },
        });
    }

    async create(payload: createUserDTO) {
        try {
            const newUser = this.usersRepository.create(payload);

            if (payload.customerId) {
                const customer = await this.customerService.findOne(
                    payload.customerId,
                );
                newUser.customer = customer;
            }
            return await this.usersRepository.save(newUser);
        } catch (error) {
            throw new BadRequestException(
                error,
                'That user has already a customer!',
            );
        }
    }

    async update(id: number, payload: updateUserDTO) {
        const user = await this.usersRepository.findOne({
            where: { id },
        });
        this.usersRepository.merge(user, payload);
        return this.usersRepository.save(user);
    }

    async delete(id: number) {
        const user = await this.usersRepository.findOne({
            where: { id },
        });
        if (!user) {
            throw new NotFoundException(`user ${id} not found!`);
        }
        return await this.usersRepository.delete(id);
    }
}
