import { Injectable } from "@nestjs/common";
import { BaseMicroserviceClient, User, UserMessagePattern } from "postme-common";

@Injectable()
export class UsersClientService extends BaseMicroserviceClient {
	constructor() {
		super(
			process.env.USERS_SERVICE_HOST, // host
			Number(process.env.USERS_SERVICE_PORT) // port
		);
	}

	async getById(id: number): Promise<User> {
		return await this.send(UserMessagePattern.Get, id);
	}
}