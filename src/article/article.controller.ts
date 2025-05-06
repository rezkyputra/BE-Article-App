import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, Query, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ArticleService } from './article.service';
import { createArticleDto } from './dto/create-article.dto';
import { IArticle } from './interface/article.interface';
import { FindOneParams } from './dto/find-one.params';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/auth/decolators/roles.decolator';
import { Role } from 'src/auth/enum/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { ArticleQueryDto } from './dto/article-query.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {

    }

    @Get()
    async findAll(@Query() query: ArticleQueryDto) {
        return await this.articleService.findAllArticle(query);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Get('/user')
    @ApiBearerAuth()
    async findArticleUser(
        @Request() req,
        @Query() query: ArticleQueryDto
    ) {
        const article = await this.articleService.articlebyUser(req.user.id, query)
        return article
    }

    @Get("/:id")
    async findOne(@Param() params: FindOneParams): Promise<Article> {
        return await this.findOneOrFail(params.id)
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post()
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        type: createArticleDto
    })
    @UseInterceptors(FileInterceptor('image'))
    async create(
        @Request() req,
        @UploadedFile() file: Express.Multer.File,
        @Body() createArticleDto: createArticleDto
    ): Promise<Article> {
        return await this.articleService.createArticle(req.user.id, createArticleDto, file)
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Put("/:id")
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        type: createArticleDto
    })
    @UseInterceptors(FileInterceptor('image'))
    async update(
        @Request() req,
        @UploadedFile() file: Express.Multer.File,
        @Param() params: FindOneParams,
        @Body() updateArticleDto: UpdateArticleDto
    ): Promise<Article> {
        const article = await this.findOneOrFail(params.id)
        return await this.articleService.updateArticleByParams(req.user.id, article, updateArticleDto, file)
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Delete("/:id")
    @ApiBearerAuth()
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Request() req,
        @Param() params: FindOneParams
    ): Promise<void> {
        const article = await this.findOneOrFail(params.id)
        await this.articleService.deleteArticleByParams(req.user.id, article)
    }

    private async findOneOrFail(id: string): Promise<Article> {
        const article = await this.articleService.findOneByParams(id)
        if (!article) {
            throw new NotFoundException()
        }

        return article
    }
}
