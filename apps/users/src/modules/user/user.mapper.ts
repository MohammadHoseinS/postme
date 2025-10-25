import { User } from "postme-common";
import { UserEntity } from "../../database/entities/user";

export class UserMapper {
	static toModel(entity: UserEntity): User {
		return new User({
			id: entity.id,
			name: entity.name,
			email: entity.email
		})
	}

	static async toModelWithDetails(entity: UserEntity): Promise<User> {
		const [following, followers] = await Promise.all([
			entity.getFollowing(),
			entity.getFollowers()
		]);

		const followingModels = following?.length ? following.map(followed => this.toModel(followed)) : [];
		const followerModels = followers?.length ? followers.map(follower => this.toModel(follower)) : [];

		return new User({
			id: entity.id,
			name: entity.name,
			email: entity.email,
			following: followingModels,
			followers: followerModels
		});
	}
}