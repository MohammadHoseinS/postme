import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { BaseEntity } from "../base.entity";
import { UserFollowingEntity } from "./user-following";

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

	@OneToMany(() => UserFollowingEntity, userFollowing => userFollowing.follower)
	following: UserFollowingEntity[];

	@OneToMany(() => UserFollowingEntity, userFollowing => userFollowing.following)
	followers: UserFollowingEntity[];

	/************************* Methods *************************/

	constructor(props?: Partial<UserEntity>) {
		super();
		Object.assign(this, props);
	}
}