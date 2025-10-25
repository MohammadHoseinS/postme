import { Body, Controller, Get, Post, Put, ValidationPipe } from "@nestjs/common";
import { PostsClientService } from "../../shared/post";
import { PaginationParams } from "../../common/decorators";
import { ParamValidationPipe } from "../../common/pipes";
import { IPaginationRequest, IPaginationResponse, PostCreateDto, Post as PostModel, PostFilterDto, PostUpdateDto } from "postme-common";

@Controller('posts')
export class PostController {
	constructor(private readonly post$: PostsClientService) {}

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
		return await this.post$.create(dto);
	}

	@Put()
	async update(
		@Body(ValidationPipe) dto: PostUpdateDto
	): Promise<PostModel> {
		return await this.post$.update(dto);
	}
}