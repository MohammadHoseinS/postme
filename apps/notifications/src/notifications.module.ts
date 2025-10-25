import { Module } from '@nestjs/common';
import { NotificationsAppController } from './notifications.controller';
import { NotificationsAppService } from './notifications.service';

@Module({
  imports: [],
  controllers: [NotificationsAppController],
  providers: [NotificationsAppService],
})
export class NotificationsAppModule {}
