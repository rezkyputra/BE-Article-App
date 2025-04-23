import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class ArticleQueryDto {
    @IsOptional()
    @IsString()
    title?: string

    @IsOptional()
    @IsUUID()
    categoryId?: string

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 3;

    @IsOptional()
    @IsIn(['title', 'createAt'])
    sortBy?: string = 'createAt'

    @IsOptional()
    @IsIn(['asc', 'desc'])
    sortOrder?: 'asc' | 'desc' = 'desc'
}