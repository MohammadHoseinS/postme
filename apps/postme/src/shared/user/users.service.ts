import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
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
		try {
			return await this.send(UserMessagePattern.Get, id);
		} catch (error) {
			throw new HttpException(error, error.statusCode);
		}
	}

	async getFull(id: number): Promise<User> {
		try {
			return await this.send(UserMessagePattern.GetFull, id);
		} catch (error) {
			throw new HttpException(error, error.statusCode);
		}
	}
	
	async load(pagination: IPaginationRequest): Promise<IPaginationResponse<User>> {
		try {
			return await this.send(UserMessagePattern.Load, pagination);
		} catch (error) {
			throw new HttpException(error, error.statusCode);
		}
	}

	async create(dto: UserSubmitDto): Promise<User> {
		try {
			return await this.send(UserMessagePattern.Create, dto);
		} catch (error) {
			throw new HttpException(error, error.statusCode);
		}
	}

	async update(dto: UserSubmitDto): Promise<User> {
		try {
			return await this.send(UserMessagePattern.Update, dto);
		} catch (error) {
			throw new HttpException(error, error.statusCode);
		}
	}

	async follow(dto: UserFollowDto): Promise<boolean> {
		try {
			return await this.send(UserMessagePattern.Follow, dto);
		} catch (error) {
			throw new HttpException(error, error.statusCode);
		}
	}

	async unfollow(dto: UserFollowDto): Promise<boolean> {
		try {
			return await this.send(UserMessagePattern.Unfollow, dto);
		} catch (error) {
			throw new HttpException(error, error.statusCode);
		}
	}
}