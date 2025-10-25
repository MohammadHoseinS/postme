import { HttpException, Injectable } from "@nestjs/common";
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
		try {
			return await this.send(PostMessagePattern.Load, pagination);
		} catch (error) {
			throw new HttpException(error, error.statusCode);
		}
	}

	async create(dto: PostCreateDto): Promise<Post> {
		try {
			return await this.send(PostMessagePattern.Create, dto);
		} catch (error) {
			throw new HttpException(error, error.statusCode);
		}
	}

	async update(dto: PostUpdateDto): Promise<Post> {
		try {
			return await this.send(PostMessagePattern.Update, dto);
		} catch (error) {
			throw new HttpException(error, error.statusCode);
		}
	}
}