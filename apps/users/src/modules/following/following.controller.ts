import { Controller } from "@nestjs/common";
import { UserFollowingService } from "./following.service";
import { MessagePattern, Payload, RpcException } from "@nestjs/microservices";
import { UserFollowDto, UserMessagePattern } from "postme-common";

@Controller()
export class UserFollowingController {
	constructor(private readonly following$: UserFollowingService) {}

	@MessagePattern(UserMessagePattern.Follow)
	async follow(
		@Payload() dto: UserFollowDto
	): Promise<boolean> {
		const follower = await this.following$.getById(dto.followerId);
		if (!follower) {
			throw new RpcException({
				statusCode: 400,
				error: 'Bad Request',
				message: 'user.exceptions.notFound',
			});
		}

		const followed = await this.following$.getById(dto.followedId);
		if (!followed) {
			throw new RpcException({
				statusCode: 400,
				error: 'Bad Request',
				message: 'user.exceptions.notFound',
			});
		}

		return await this.following$.follow(follower, followed);
	}

	@MessagePattern(UserMessagePattern.Unfollow)
	async unfollow(
		@Payload() dto: UserFollowDto
	): Promise<boolean> {
		const follower = await this.following$.getById(dto.followerId);
		if (!follower) {
			throw new RpcException({
				statusCode: 400,
				error: 'Bad Request',
				message: 'user.exceptions.notFound',
			});
		}

		const followed = await this.following$.getById(dto.followedId);
		if (!followed) {
			throw new RpcException({
				statusCode: 400,
				error: 'Bad Request',
				message: 'user.exceptions.notFound',
			});
		}

		return await this.following$.unfollow(follower, followed);
	}
}