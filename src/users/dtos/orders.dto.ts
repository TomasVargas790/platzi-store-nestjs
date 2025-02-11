import { IsDate, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

export class createOrderDTO {
    @IsDate()
    @IsNotEmpty()
    date: Date;

    user: User;

    products: Product[];
}

export class updateOrderDTO extends PartialType(createOrderDTO) {}
