import { Injectable } from "@nestjs/common";
import { BaseMicroserviceClient, NotificationMessagePattern } from "postme-common";

@Injectable()
export class NotificationsClientService extends BaseMicroserviceClient {
	constructor() {
		super(
			process.env.NOTIFICATIONS_SERVICE_HOST, // host
			Number(process.env.NOTIFICATIONS_SERVICE_PORT) // port
		);
	}

	async create(userIds: number[]): Promise<boolean> {
		return await this.send(NotificationMessagePattern.PostCreated, userIds);
	}
}