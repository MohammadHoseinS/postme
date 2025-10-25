import { HttpException, Injectable } from "@nestjs/common";
import { BaseMicroserviceClient, NotificationMessagePattern } from "postme-common";

@Injectable()
export class NotificationsClientService extends BaseMicroserviceClient {
	constructor() {
		super(
			process.env.NOTIFICATIONS_SERVICE_HOST, // host
			Number(process.env.NOTIFICATIONS_SERVICE_PORT) // port
		);
	}

	async notifyPostCreated(userIds: number[]): Promise<boolean> {
		try {
			return await this.send(NotificationMessagePattern.PostCreated, userIds);
		} catch (error) {
			throw new HttpException(error, error.status);
		}
	}
}