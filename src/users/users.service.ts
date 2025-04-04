import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async findAllUser(): Promise<User[]> {
        const user = await this.userRepository.find({
            select: {
                id: true,
                name: true,
                email: true,
            }
        })
        return user
    }

    async findByParams(id: string): Promise<User | null> {
        return await this.userRepository.findOneBy({ id })
    }

    async UpdateRoleUser(user: User, updateRoleDto: UpdateRoleDto): Promise<{ message: string }> {
        Object.assign(user, updateRoleDto)
        await this.userRepository.save(user)
        return {
            message: "Update Role Berhasil"
        }
    }
}
