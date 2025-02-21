import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../entities/customer.entity';
import { createCustomerDTO, updateCustomerDTO } from '../dtos/customers.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
    ) {}

    counterId = 0;

    findAll() {
        return this.customerRepository.find();
    }

    async findOne(id: number) {
        const customer = await this.customerRepository.findOne(id);
        if (!customer) {
            throw new NotFoundException(`Product ${id} not found!`);
        }
        return customer;
    }

    create(payload: createCustomerDTO) {
        const newProduct = this.customerRepository.create(payload);
        return this.customerRepository.save(newProduct);
    }

    async update(id: number, payload: updateCustomerDTO) {
        const customer = await this.customerRepository.findOne(id);
        this.customerRepository.merge(customer, payload);
        return this.customerRepository.save(customer);
    }

    async delete(id: number) {
        const customer = await this.customerRepository.findOne(id);
        if (!customer) {
            throw new NotFoundException(`Customer ${id} not found!`);
        }
        return await this.customerRepository.delete(id);
    }
}
