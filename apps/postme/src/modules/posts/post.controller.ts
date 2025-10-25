import { Body, Controller, Get, Post, Put, ValidationPipe } from "@nestjs/common";
import { PostsClientService } from "../../shared/post";
import { PaginationParams } from "../../common/decorators";
import { ParamValidationPipe } from "../../common/pipes";
import { IPaginationRequest, IPaginationResponse, PostCreateDto, Post as PostModel, PostFilterDto, PostUpdateDto } from "postme-common";
import { UsersClientService } from "../../shared/user";
import { NotificationsClientService } from "../../shared/notification";

@Controller('posts')
export class PostController {
	constructor(
		private readonly post$: PostsClientService,
		private readonly user$: UsersClientService,
		private readonly notification$: NotificationsClientService
	) {}

	@Get()
	async load(
		@PaginationParams(new ParamValidationPipe(PostFilterDto))
		pagination: IPaginationRequest<PostFilterDto>
	): Promise<IPaginationResponse<PostModel>> {
		return await this.post$.load(pagination);
	}

	@Post()
	async create(
		@Body(ValidationPipe) dto: PostCreateDto
	): Promise<PostModel> {
		const reuslt = await this.post$.create(dto);
		const user = await this.user$.getFull(dto.createdBy);
		if (user) {
			const followers = user.followers || [];
			const followerIds = followers.map(f => f.id);
			if (followerIds.length) {
				this.notification$.notifyPostCreated(followerIds);
			}
		}
		return reuslt;
	}

	@Put()
	async update(
		@Body(ValidationPipe) dto: PostUpdateDto
	): Promise<PostModel> {
		return await this.post$.update(dto);
	}
}