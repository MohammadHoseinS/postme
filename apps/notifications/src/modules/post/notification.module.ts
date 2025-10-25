import { Module } from "@nestjs/common";
import { PostNotificationController } from "./notification.controller";
import { PostNotificationService } from "./notification.service";

@Module({
	controllers: [PostNotificationController],
	providers: [PostNotificationService],
})
export class PostNotificationModule {}