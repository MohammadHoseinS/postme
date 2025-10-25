import { Injectable } from "@nestjs/common";
import { IPaginationRequest, PostCreateDto, PostFilterDto, PostUpdateDto } from "postme-common";
import { DataSource } from "typeorm";
import { PostEntity } from "../../database/entities/post";

@Injectable()
export class PostService {
	constructor(private readonly dataSource: DataSource) {}

	async getById(id: number): Promise<PostEntity> {
		return await this.dataSource.manager.findOneBy(PostEntity, {
			id
		});
	}

	async load(pagination: IPaginationRequest<PostFilterDto>): Promise<[PostEntity[], number]> {
		const { limit: take, skip, params: { title, createdBy } } = pagination;

		const query = this.dataSource
			.createQueryBuilder(PostEntity, 'p')
			.take(take)
			.skip(skip)
			.orderBy('p.createdOn', 'DESC');

		if (title) {
			query.andWhere('p.title LIKE :title', { title: `%${title}%` });
		}

		if (createdBy) {
			query.andWhere('p.createdBy = :createdBy', { createdBy });
		}

		return await 
			query.getManyAndCount();
	}

	async create(dto: PostCreateDto): Promise<PostEntity> {
		return await this.dataSource.manager.save(new PostEntity({
			title: dto.title,
			content: dto.content,
			createdBy: dto.createdBy
		}));
	}

	async update(post: PostEntity, dto: PostUpdateDto): Promise<PostEntity> {
		post.title = dto.title;
		post.content = dto.content;
		return await this.dataSource.manager.save(post);
	}
}