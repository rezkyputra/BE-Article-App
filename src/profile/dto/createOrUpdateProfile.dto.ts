import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createOrUpdateProfileDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    age: number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    bio: string
}