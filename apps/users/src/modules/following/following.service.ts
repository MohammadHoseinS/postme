import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { UserEntity } from "../../database/entities/user";
import { UserFollowingEntity } from "../../database/entities/user-following";

@Injectable()
export class UserFollowingService {
	constructor(private readonly dataSource: DataSource) {}

	async getById(id: number): Promise<UserEntity> {
		return await this.dataSource.manager.findOneBy(UserEntity, { id });
	}

	async follow(follower: UserEntity, followed: UserEntity): Promise<boolean> {
		await this.dataSource.manager.save(new UserFollowingEntity({
			followerId: follower.id,
			follower: Promise.resolve(follower),
			followedId: followed.id,
			followed: Promise.resolve(followed),
		}))
		return true;
	}

	async unfollow(follower: UserEntity, followed: UserEntity): Promise<boolean> {
		const following = await this.dataSource.manager.findOneBy(UserFollowingEntity, {
			followerId: follower.id,
			followedId: followed.id
		});

		if (following) {
			await this.dataSource.manager.remove(following);
		}

		return true;
	}
}