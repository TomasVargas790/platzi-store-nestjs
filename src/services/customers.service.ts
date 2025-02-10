import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '@entities/customer.entity';
import { createCustomerDTO, updateCustomerDTO } from 'src/dtos/customers.dto';
@Injectable()
export class CustomersService {
    private customers: Customer[] = [
        {
            id: 1,
            firstName: 'Tomás',
            lastName: 'Vargas',
            email: 'vargastomas2003@gmail.com',
            phone: '1126365060',
            userId: 1,
        },
    ];

    counterId = 0;

    findAll() {
        return this.customers;
    }

    findOne(id: number) {
        const customer = this.customers.find((p) => p.id === id);
        if (!customer) {
            throw new NotFoundException(`Customer ${id} not found!`);
        }
        return customer;
    }

    create(payload: createCustomerDTO) {
        this.counterId++;

        const newCustomer = {
            id: this.counterId,
            ...payload,
        } as Customer;

        this.customers = [...this.customers, newCustomer];
        return newCustomer;
    }

    update(id: number, payload: updateCustomerDTO) {
        this.customers = this.customers.map((p) =>
            p.id === id
                ? { ...p, ...(payload as unknown as Customer) }
                : { ...p },
        );
        return this.customers.find((p) => p.id === id);
    }

    delete(id: number) {
        const newCustomers = this.customers.filter((p) => p.id !== id);
        if (this.customers.length === newCustomers.length) {
            throw new NotFoundException(`Customer ${id} not found!`);
        }
        this.customers = [...newCustomers];

        return id;
    }
}
