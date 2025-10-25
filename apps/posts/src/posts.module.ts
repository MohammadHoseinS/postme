import { Module } from '@nestjs/common';
import { PostsAppController } from './posts.controller';
import { PostsAppService } from './posts.service';
import { DatabaseModule } from './database/database.module';

@Module({
	imports: [DatabaseModule],
	controllers: [PostsAppController],
	providers: [PostsAppService]
})
export class PostsAppModule {}
