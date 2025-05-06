import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class FindOneParams {
    @ApiProperty({ description: "Masukan id Category" })
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    id: string
}