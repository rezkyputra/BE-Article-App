import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from "class-validator";
import { Role } from "../enum/role.enum";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    @Matches(/[A-Z]/, {
        message: "Password minimal ada 1 huruf kapital"
    })
    @Matches(/[0-9]/, {
        message: "Password minimal ada 1 angka"
    })
    @Matches(/[^A-Za-z0-9]/, {
        message: "Password minimal ada 1 karater spesial"
    })
    password: string

    @IsOptional()
    @IsEnum(Role)
    role: Role
}