import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class ArticleQueryDto {
    @ApiPropertyOptional({ description: "cari data berdasarkan judul article" })
    @IsOptional()
    @IsString()
    title?: string

    @ApiPropertyOptional({ description: "cari data berdasarkan id Category" })
    @IsOptional()
    @IsUUID()
    categoryId?: string

    @ApiPropertyOptional({ description: "halaman Page sekarang" })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional({ description: "jumlah data per page" })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 3;

    @ApiPropertyOptional({ description: "Sort by", enum: ['title', 'category', 'createAt'] })
    @IsOptional()
    @IsIn(['title', 'createAt'])
    sortBy?: string = 'createAt'

    @ApiPropertyOptional({ description: 'Sort Order', enum: ['asc', 'desc'] })
    @IsOptional()
    @IsIn(['asc', 'desc'])
    sortOrder?: 'asc' | 'desc' = 'desc'
}