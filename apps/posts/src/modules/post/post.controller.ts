import { Controller } from "@nestjs/common";
import { PostService } from "./post.service";
import { MessagePattern, Payload, RpcException } from "@nestjs/microservices";
import { IPaginationRequest, IPaginationResponse, Paginator, Post, PostCreateDto, PostFilterDto, PostUpdateDto } from "postme-common";
import { PostMapper } from "./post.mapper";
import { UsersClientService } from "./users.service";

@Controller()
export class PostController {
	constructor(
		private readonly post$: PostService,
		private readonly users$: UsersClientService
	) {}

	@MessagePattern('posts.load')
	async load(
		@Payload() pagination: IPaginationRequest<PostFilterDto>
	): Promise<IPaginationResponse<Post>> {
		const [entities, total] = await this.post$.load(pagination);
		if (!entities?.length) {
			return Paginator.of<Post>(pagination, 0, []);
		}

		const models = await Promise.all(
			entities.map(async post => {
				const result = PostMapper.toModel(post)
				const user = await this.users$.getById(post.createdBy);
				if (user) {
					result.createdByName = user.name;
				}
				return result;
			})
		);

		return Paginator.of<Post>(pagination, total, models);
	}

	@MessagePattern('posts.create')
	async create(
		@Payload() dto: PostCreateDto
	): Promise<Post> {
		const createdBy = await this.users$.getById(dto.createdBy);
		if (!createdBy) {
			throw new RpcException({
				statusCode: 400,
				error: 'Bad Request',
				message: 'user.exceptions.notFound',
			});
		}

		const result = await this.post$.create(dto);
		return PostMapper.toModel(result);
	}

	@MessagePattern('posts.update')
	async update(
		@Payload() dto: PostUpdateDto
	): Promise<Post> {
		const post = await this.post$.getById(dto.id);
		if (!post) {
			throw new RpcException({
				statusCode: 400,
				error: 'Bad Request',
				message: 'post.exceptions.notFound',
			});
		}

		const updated = await this.post$.update(post, dto);
		return PostMapper.toModel(updated);
	}
}