import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ProfileService } from './profile.service';
import { createOrUpdateProfileDto } from './dto/createOrUpdateProfile.dto';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    @Post()
    async updateOrCreateProfile(@Request() req, @Body() createOrUpdateProfileDto: createOrUpdateProfileDto): Promise<{ message: string }> {
        return await this.profileService.updateOrCreateProfile(req.user.id, createOrUpdateProfileDto)
    }
}
