import { Injectable } from "@nestjs/common";
import { BaseMicroserviceClient, IPaginationRequest, IPaginationResponse, User, UserFollowDto, UserMessagePattern, UserSubmitDto } from "postme-common";

@Injectable()
export class UsersClientService extends BaseMicroserviceClient {
	constructor() {
		super(
			process.env.USERS_SERVICE_HOST, // host
			Number(process.env.USERS_SERVICE_PORT) // port
		);
	}

	async get(id: number): Promise<User> {
		return await this.send(UserMessagePattern.Get, id);
	}

	async getFull(id: number): Promise<User> {
		return await this.send(UserMessagePattern.GetFull, id);
	}
	
	async load(pagination: IPaginationRequest): Promise<IPaginationResponse<User>> {
		return await this.send(UserMessagePattern.Load, pagination);
	}

	async create(dto: UserSubmitDto): Promise<User> {
		return await this.send(UserMessagePattern.Create, dto);
	}

	async update(dto: UserSubmitDto): Promise<User> {
		return await this.send(UserMessagePattern.Update, dto);
	}

	async follow(dto: UserFollowDto): Promise<boolean> {
		return await this.send(UserMessagePattern.Follow, dto);
	}

	async unfollow(dto: UserFollowDto): Promise<boolean> {
		return await this.send(UserMessagePattern.Unfollow, dto);
	}
}