import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersClientModule } from './shared/user/users.module';
import { UserModule } from './modules/users/user.module';
import { PostsClientModule } from './shared/post/posts.module';
import { LocalizationModule } from './shared/localization';
import { PostModule } from './modules/posts/post.module';
import { NotificationsClientModule } from './shared/notification/notifications.module';

@Module({
	imports: [
		LocalizationModule,
		UsersClientModule,
		PostsClientModule,
		NotificationsClientModule,
		UserModule,
		PostModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
