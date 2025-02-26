import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ArticleService } from './article.service';
import { createArticleDto } from './dto/create-article.dto';
import { IArticle } from './interface/article.interface';
import { FindOneParams } from './dto/find-one.params';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {

    }

    @Get()
    findAll(): IArticle[] {
        return this.articleService.findAllArticle();
    }

    @Get("/:id")
    findOne(@Param() params: FindOneParams): IArticle {
        return this.findOneOrFail(params.id)
    }

    @Post()
    create(@Body() createArticleDto: createArticleDto): IArticle {
        return this.articleService.createArticle(createArticleDto)
    }

    @Put("/:id")
    update(@Param() params: any): string {
        return `Update Article ${params.id}`
    }

    @Delete("/:id")
    delete(@Param() params: any): string {
        return `Delete Article ${params.id}`
    }

    private findOneOrFail(id: string): IArticle {
        const article = this.articleService.findOneByParams(id)
        if (!article) {
            throw new NotFoundException()
        }

        return article
    }
}
