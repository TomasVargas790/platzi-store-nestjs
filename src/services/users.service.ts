import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@entities/user.entity';
import { createUserDTO, updateUserDTO } from 'src/dtos/users.dto';
@Injectable()
export class UsersService {
    private users: User[] = [
        {
            id: 1,
            name: 'Tomás Vargas',
            password: 'grandetuco1',
            username: 'vargastomas2003@gmail.com',
        },
    ];

    counterId = 0;

    findAll() {
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find((p) => p.id === id);
        if (!user) {
            throw new NotFoundException(`User ${id} not found!`);
        }
        return user;
    }

    create(payload: createUserDTO) {
        this.counterId++;

        const newUser = {
            id: this.counterId,
            ...payload,
        } as User;

        this.users = [...this.users, newUser];
        return newUser;
    }

    update(id: number, payload: updateUserDTO) {
        this.users = this.users.map((p) =>
            p.id === id ? { ...p, ...(payload as unknown as User) } : { ...p },
        );
        return this.users.find((p) => p.id === id);
    }

    delete(id: number) {
        const newUsers = this.users.filter((p) => p.id !== id);
        if (this.users.length === newUsers.length) {
            throw new NotFoundException(`User ${id} not found!`);
        }
        this.users = [...newUsers];

        return id;
    }
}
