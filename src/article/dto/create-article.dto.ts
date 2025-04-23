import { IsNotEmpty, IsString, IsEnum, IsUUID, IsOptional } from "class-validator";
import { ArticleStatus } from "../interface/article.interface";
export class createArticleDto {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    content: string

    @IsNotEmpty()
    @IsEnum(ArticleStatus)
    status: ArticleStatus

    @IsNotEmpty()
    @IsUUID()
    categoryId: string

    @IsOptional()
    tags: string[]
}