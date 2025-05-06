import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { Role } from "src/auth/enum/role.enum";

export class UpdateRoleDto {
    @ApiProperty({ enum: Role })
    @IsNotEmpty()
    @IsEnum(Role)
    role: Role
}