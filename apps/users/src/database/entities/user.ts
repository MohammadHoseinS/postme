import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { UserFollowingEntity } from './user-following';
import dataSource from '../datasource';

@Entity('users')
export class UserEntity extends BaseEntity {
	@Column({
		nullable: false
	})
	name: string;

	@Column({
		nullable: false,
		unique: true
	})
	email: string;

	/************************* Relations *************************/

	// Follower entity has a list of followings
	@OneToMany(() => UserFollowingEntity, userFollowing => userFollowing.follower)
	followings: Promise<UserFollowingEntity[]>;

	// Following entity has a list of followers
	@OneToMany(() => UserFollowingEntity, userFollowing => userFollowing.followed)
	followers: Promise<UserFollowingEntity[]>;

	/************************* Methods *************************/

	constructor(props?: Partial<UserEntity>) {
		super();
		Object.assign(this, props);
	}

	/**
   * Get all users who follow the given user
   */
	async getFollowers(): Promise<UserEntity[]> {
		return await dataSource
			.createQueryBuilder(UserEntity, 'follower')
			.innerJoin('follower.followings', 'uf')
			.where('uf.followedId = :userId', { userId: this.id })
			.getMany();
	}

	/**
	 * Get all users whom the given user is following
	 */
	async getFollowings(): Promise<UserEntity[]> {
		return await dataSource
			.createQueryBuilder(UserEntity, 'following')
			.innerJoin('following.followers', 'uf')
			.where('uf.followerId = :userId', { userId: this.id })
			.getMany();
	}
}
