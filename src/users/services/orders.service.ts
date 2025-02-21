import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { createOrderDTO, updateOrderDTO } from '../dtos/orders.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
    ) {}

    counterId = 0;

    findAll() {
        return this.orderRepository.find();
    }

    async findOne(id: number) {
        const order = await this.orderRepository.findOne(id);
        if (!order) {
            throw new NotFoundException(`Product ${id} not found!`);
        }
        return order;
    }

    create(payload: createOrderDTO) {
        const newProduct = this.orderRepository.create(payload);
        return this.orderRepository.save(newProduct);
    }

    async update(id: number, payload: updateOrderDTO) {
        const order = await this.orderRepository.findOne(id);
        this.orderRepository.merge(order, payload);
        return this.orderRepository.save(order);
    }

    async delete(id: number) {
        const order = await this.orderRepository.findOne(id);
        if (!order) {
            throw new NotFoundException(`Order ${id} not found!`);
        }
        return await this.orderRepository.delete(id);
    }
}
