import { Module } from '@nestjs/common';
import { NotificationsAppController } from './notifications.controller';
import { NotificationsAppService } from './notifications.service';
import { PostNotificationModule } from './modules/post/notification.module';

@Module({
	imports: [PostNotificationModule],
	controllers: [NotificationsAppController],
	providers: [NotificationsAppService]
})
export class NotificationsAppModule {}
