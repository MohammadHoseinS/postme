import { Injectable } from "@nestjs/common";
import { BaseMicroserviceClient, IPaginationRequest, IPaginationResponse, Post, PostCreateDto, PostFilterDto, PostMessagePattern, PostUpdateDto } from "postme-common";

@Injectable()
export class PostsClientService extends BaseMicroserviceClient {
	constructor() {
		super(
			process.env.POSTS_SERVICE_HOST, // host
			Number(process.env.POSTS_SERVICE_PORT) // port
		);
	}

	async load(pagination: IPaginationRequest<PostFilterDto>): Promise<IPaginationResponse<Post>> {
		return await this.send(PostMessagePattern.Load, pagination);
	}

	async create(dto: PostCreateDto): Promise<Post> {
		return await this.send(PostMessagePattern.Create, dto);
	}

	async update(dto: PostUpdateDto): Promise<Post> {
		return await this.send(PostMessagePattern.Update, dto);
	}
}