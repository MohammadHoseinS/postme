import { Controller, Get } from '@nestjs/common';
import { PostsAppService } from './posts.service';

@Controller()
export class PostsAppController {
	constructor(private readonly postsService: PostsAppService) {}

	@Get()
	getHello(): string {
		return this.postsService.getHello();
	}
}
