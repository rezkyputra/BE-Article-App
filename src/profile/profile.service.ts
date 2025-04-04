import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { createOrUpdateProfileDto } from './dto/createOrUpdateProfile.dto';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,

        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async updateOrCreateProfile(userId: string, createorUpdateProfileDto: createOrUpdateProfileDto): Promise<{ message: string }> {
        const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['profile'] })
        if (!user) {
            throw new NotFoundException("user tidak ditemukan")
        }

        if (user.profile) {
            //update Profile
            Object.assign(user.profile, createorUpdateProfileDto)
            await this.profileRepository.save(user.profile)
            return {
                message: "Berhasil Update Profile"
            }
        } else {
            // Tambah Profile
            const newProfile = this.profileRepository.create(createorUpdateProfileDto)
            newProfile.user = user
            await this.profileRepository.save(newProfile)
            return {
                message: "Berhasil buat Profile"
            }
        }
    }
}
