import { Injectable } from '@nestjs/common';
import { createOrderItemDTO } from '../dtos/orders-item-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities';
import { OrderItem } from '../entities/order-item.entity';
import { Product } from 'src/products/entities';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(OrderItem)
        private orderItemRepository: Repository<OrderItem>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}
    async create(payload: createOrderItemDTO) {
        const order = await this.orderRepository.findOne({
            where: { id: payload.orderId },
        });
        const product = await this.productRepository.findOne({
            where: { id: payload.productId },
        });

        const item = new OrderItem();

        item.product = product;
        item.order = order;
        item.quantity = payload.quantity;

        return this.orderItemRepository.save(item);
    }
}
