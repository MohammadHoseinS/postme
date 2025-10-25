import { Global, Module } from "@nestjs/common";
import { PostsClientService } from "./posts.service";

@Global()
@Module({
	providers: [PostsClientService],
	exports: [PostsClientService]
})
export class PostsClientModule {}