import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { createOrderDTO, updateOrderDTO } from '../dtos/orders.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../entities';
@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
    ) {}

    counterId = 0;

    findAll() {
        return this.orderRepository.find();
    }

    async findOne(id: number) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['items', 'items.product'],
        });
        if (!order) {
            throw new NotFoundException(`Product ${id} not found!`);
        }
        return order;
    }

    async create(payload: createOrderDTO) {
        const newProduct = new Order();
        if (payload.customerId) {
            newProduct.customer = await this.customerRepository.findOne({
                where: { id: payload.customerId },
            });
        }
        return this.orderRepository.save(newProduct);
    }

    async update(id: number, payload: updateOrderDTO) {
        const order = await this.orderRepository.findOne({
            where: { id },
        });
        if (payload.customerId) {
            order.customer = await this.customerRepository.findOne({
                where: { id: payload.customerId },
            });
        }
        return this.orderRepository.save(order);
    }

    async delete(id: number) {
        const order = await this.orderRepository.findOne({
            where: { id },
        });
        if (!order) {
            throw new NotFoundException(`Order ${id} not found!`);
        }
        return await this.orderRepository.delete(id);
    }
}
