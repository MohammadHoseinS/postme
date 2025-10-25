import { Injectable } from "@nestjs/common";

@Injectable()
export class PostNotificationService {
	constructor() {}

	notifyPostCreated(userIds: number[]): boolean {
		// Logic to notify about post creation
		return true;
	}
}