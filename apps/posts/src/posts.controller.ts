import { Controller, Get } from '@nestjs/common';
import { PostsAppService } from './posts.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class PostsAppController {
	constructor(private readonly postsService: PostsAppService) {}

	@MessagePattern('posts.healthcheck')
	healthcheck(): string {
		return this.postsService.getHello();
	}
}
