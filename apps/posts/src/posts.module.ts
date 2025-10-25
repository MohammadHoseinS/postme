import { Module } from '@nestjs/common';
import { PostsAppController } from './posts.controller';
import { PostsAppService } from './posts.service';
import { DatabaseModule } from './database/database.module';
import { PostModule } from './modules/post/post.module';

@Module({
	imports: [
    DatabaseModule,
    PostModule
  ],
	controllers: [PostsAppController],
	providers: [PostsAppService]
})
export class PostsAppModule {}
