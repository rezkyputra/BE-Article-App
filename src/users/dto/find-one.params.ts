import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class FindOneParams {
    @ApiProperty({ description: "masukan id User anda" })
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    id: string
}