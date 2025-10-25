import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from "@nestjs/common";
import { IPaginationRequest, IPaginationResponse, User, UserFollowDto, UserSubmitDto } from "postme-common";
import { PaginationParams } from "../../common/decorators";
import { UsersClientService } from "../../shared/user";

@Controller('users')
export class UserController {
	constructor(private readonly user$: UsersClientService) {}

	@Get('load')
	async load(
		@PaginationParams() pagination: IPaginationRequest
	): Promise<IPaginationResponse<User>> {
		return await this.user$.load(pagination);
	}

	@Get(':id')
	async get(@Param('id', ParseIntPipe) id: number): Promise<User> {
		return await this.user$.get(id);
	}

	@Get(':id/full')
	async getFull(@Param('id', ParseIntPipe) id: number): Promise<User> {
		return await this.user$.getFull(id);
	}

	@Post('create')
	async create(
		@Body(ValidationPipe) dto: UserSubmitDto
	): Promise<User> {
		return await this.user$.create(dto);
	}

	@Put()
	async update(
		@Body(ValidationPipe) dto: UserSubmitDto
	): Promise<User> {
		return await this.user$.update(dto);
	}

	@Post('follow')
	async follow(
		@Body(ValidationPipe) dto: UserFollowDto
	): Promise<boolean> {
		return await this.user$.follow(dto);
	}

	@Post('unfollow')
	async unfollow(
		@Body(ValidationPipe) dto: UserFollowDto
	): Promise<boolean> {
		return await this.user$.unfollow(dto);
	}
}