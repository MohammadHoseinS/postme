import { Module } from '@nestjs/common';
import { PostsAppController } from './posts.controller';
import { PostsAppService } from './posts.service';

@Module({
  imports: [],
  controllers: [PostsAppController],
  providers: [PostsAppService],
})
export class PostsAppModule {}
