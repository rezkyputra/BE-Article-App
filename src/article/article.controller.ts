import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('article')
export class ArticleController {
    @Get()
    findAll(): string {
        return "Tampil semua Article"
    }

    @Get("/:id")
    findOne(@Param() params: any): string {
        return `Tampil Detail Article ${params.id}`
    }

    @Post()
    create(): string {
        return "tambah Article"
    }

    @Put("/:id")
    update(@Param() params: any): string {
        return `Update Article ${params.id}`
    }

    @Delete("/:id")
    delete(@Param() params: any): string {
        return `Delete Article ${params.id}`
    }
}
