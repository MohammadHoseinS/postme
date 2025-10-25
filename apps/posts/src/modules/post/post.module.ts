import { Module } from "@nestjs/common";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { UsersClient } from "./users.client";

@Module({
	controllers: [PostController],
	providers: [PostService, UsersClient],
})
export class PostModule {}