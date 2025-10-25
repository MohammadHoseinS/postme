import { Controller } from "@nestjs/common";
import { UserService } from "./user.service";
import { MessagePattern, Payload, RpcException } from "@nestjs/microservices";
import { IPaginationRequest, IPaginationResponse, Paginator, User, UserMessagePattern, UserSubmitDto } from "postme-common";
import { UserMapper } from "./user.mapper";

@Controller()
export class UserController {
	constructor(private readonly user$: UserService) {}

	@MessagePattern(UserMessagePattern.Get)
	async getUser(
		@Payload() id: number
	): Promise<User> {
		const user = await this.user$.getById(id);
		if (!user) {
			throw new RpcException({
				statusCode: 400,
				error: 'Bad Request',
				message: 'user.exceptions.notFound',
			});
		}

		return await UserMapper.toModel(user);
	}

	@MessagePattern(UserMessagePattern.GetFull)
	async getUserFull(
		@Payload() id: number
	): Promise<User> {
		const user = await this.user$.getById(id);
		if (!user) {
			throw new RpcException({
				statusCode: 400,
				error: 'Bad Request',
				message: 'user.exceptions.notFound',
			});
		}

		return await UserMapper.toModelWithDetails(user);
	}

	@MessagePattern(UserMessagePattern.Load)
	async load(
		@Payload() pagination: IPaginationRequest
	): Promise<IPaginationResponse<User>> {
		const [entities, total] = await this.user$.load(pagination);
		if (!entities?.length) {
			return Paginator.of<User>(pagination, 0, []);
		}

		const models = await Promise.all(
			entities.map(user => UserMapper.toModel(user))
		);

		return Paginator.of<User>(pagination, total, models);
	}

	@MessagePattern(UserMessagePattern.Create)
	async create(
		@Payload() dto: UserSubmitDto
	): Promise<User> {
		const emailExists = await this.user$.getExists(dto.email);
		if (emailExists) {
			throw new RpcException({
				statusCode: 400,
				error: 'Bad Request',
				message: 'user.exceptions.emailExists',
			});
		}

		const user = await this.user$.create(dto);
		return UserMapper.toModelWithDetails(user);
	}

	@MessagePattern(UserMessagePattern.Update)
	async update(
		@Payload() dto: UserSubmitDto
	): Promise<User> {
		const user = await this.user$.getById(dto.id);
		if (!user) {
			throw new RpcException({
				statusCode: 400,
				error: 'Bad Request',
				message: 'user.exceptions.notFound',
			});
		}

		const emailExists = await this.user$.getExists(dto.email, dto.id);
		if (emailExists) {
			throw new RpcException({
				statusCode: 400,
				error: 'Bad Request',
				message: 'user.exceptions.emailExists',
			});
		}

		const result = await this.user$.update(user, dto);
		return UserMapper.toModel(result);
	}
}