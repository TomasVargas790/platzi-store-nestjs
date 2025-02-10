import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from 'src/users/entities/order.entity';
import { createOrderDTO, updateOrderDTO } from 'src/users/dtos/orders.dto';
@Injectable()
export class OrdersService {
    private orders: Order[] = [
        {
            id: 1,
            customerId: 1,
        },
    ];

    counterId = 0;

    findAll() {
        return this.orders;
    }

    findOne(id: number) {
        const order = this.orders.find((p) => p.id === id);
        if (!order) {
            throw new NotFoundException(`Order ${id} not found!`);
        }
        return order;
    }

    create(payload: createOrderDTO) {
        this.counterId++;

        const newOrder = {
            id: this.counterId,
            ...payload,
        } as Order;

        this.orders = [...this.orders, newOrder];
        return newOrder;
    }

    update(id: number, payload: updateOrderDTO) {
        this.orders = this.orders.map((p) =>
            p.id === id ? { ...p, ...(payload as unknown as Order) } : { ...p },
        );
        return this.orders.find((p) => p.id === id);
    }

    delete(id: number) {
        const newOrders = this.orders.filter((p) => p.id !== id);
        if (this.orders.length === newOrders.length) {
            throw new NotFoundException(`Order ${id} not found!`);
        }
        this.orders = [...newOrders];

        return id;
    }
}
