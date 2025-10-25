import { Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
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
		try {
		return await this.send(UserMessagePattern.Get, id);
		} catch (error) {
			throw new RpcException({
				statusCode: error.statusCode,
				error: error?.error,
				message: error.message,
			});
		}
	}
}