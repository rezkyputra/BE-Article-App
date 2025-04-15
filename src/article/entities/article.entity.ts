import { ManyToOne, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ArticleStatus } from "../interface/article.interface";
import { Category } from "../../category/entities/category.entity";
import { User } from "../../auth/entities/user.entity";

@Entity()
export class Article {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    title: string

    @Column({
        type: 'text'
    })
    content: string

    @Column({
        nullable: true
    })
    image: string

    @Column({
        type: 'enum',
        enum: ArticleStatus,
        default: ArticleStatus.PENDING
    })
    status: ArticleStatus

    @ManyToOne(() => Category, (category) => category.id)
    category: Category

    @Column({
        type: "uuid"
    })
    categoryId: string

    @ManyToOne(() => User, (user) => user.id)
    user: User

    @Column({
        type: "uuid"
    })
    userId: string

    @CreateDateColumn()
    readonly createAt!: Date

    @UpdateDateColumn()
    readonly updatedAt!: Date
}