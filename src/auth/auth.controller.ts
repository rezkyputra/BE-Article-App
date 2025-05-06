import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from './guard/auth.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {

    }

    @Post('register')
    @ApiBody({
        type: RegisterDto
    })
    async register(@Body() registerDto: RegisterDto) {
        return await this.authService.registerUser(registerDto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiBody({
        type: LoginDto
    })
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.loginUser(loginDto)
    }

    @UseGuards(AuthGuard)
    @Get('getuser')
    @ApiBearerAuth()
    async getUser(@Request() request): Promise<User | null> {
        return await this.authService.getUser(request.user.id)
    }
}
