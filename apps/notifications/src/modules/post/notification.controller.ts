import { Controller } from "@nestjs/common";
import { PostNotificationService } from "./notification.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { NotificationMessagePattern } from "postme-common";

@Controller()
export class PostNotificationController {
	constructor(private readonly post$: PostNotificationService) {}

	@MessagePattern(NotificationMessagePattern.PostCreated)
	async notifyPostCreated(
		@Payload() userIds: number[]
	): Promise<boolean> {
		return this.post$.notifyPostCreated(userIds);
	}
}