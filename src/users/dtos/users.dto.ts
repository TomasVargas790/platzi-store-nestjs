import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class createUserDTO {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;
}

export class updateUserDTO extends PartialType(createUserDTO) {}
