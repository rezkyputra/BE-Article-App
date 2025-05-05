import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { Article } from '../article/entities/article.entity';
import { CreateUpdateCommentDto } from './dto/create-update-comment.dto';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private CommentRepository: Repository<Comment>,
        @InjectRepository(Article)
        private ArticleRepository: Repository<Article>,
    ) { }

    async updateOrCreateComment(userId: string, createUpdateCommentDto: CreateUpdateCommentDto): Promise<{ message: string }> {
        const article = await this.ArticleRepository.findOne({ where: { id: createUpdateCommentDto.articleId } })
        if (!article) {
            throw new NotFoundException("Article tidak ditemukan")
        }

        const comment = await this.CommentRepository.findOne({ where: { articleId: createUpdateCommentDto.articleId, userId } })

        if (!comment) {
            // Create comment
            const newComment = this.CommentRepository.create(createUpdateCommentDto)
            newComment.userId = userId
            await this.CommentRepository.save(newComment)
            return {
                message: "Berhasil buat Comment"
            }
        } else {
            // Update Comment
            Object.assign(comment, createUpdateCommentDto)
            await this.CommentRepository.save(comment)
            return {
                message: "Berhasil Update Comment"
            }
        }
    }

    async isValidComment(userId: string, articleId: string): Promise<{ status: boolean, id?: string }> {
        const comment = await this.CommentRepository.findOne({ where: { articleId, userId } })

        if (comment) {
            return {
                status: true,
                id: comment.id
            }
        } else {
            return {
                status: false
            }
        }
    }
}
