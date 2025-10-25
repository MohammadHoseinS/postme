import { Module } from "@nestjs/common";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { UsersClientService } from "./users.service";

@Module({
	controllers: [PostController],
	providers: [PostService, UsersClientService],
})
export class PostModule {}