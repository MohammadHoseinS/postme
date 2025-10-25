import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { UserEntity } from './user';
import dataSource from '../datasource';

@Index(['followerId', 'followedId'], { unique: true })
@Entity('userFollowings')
export class UserFollowingEntity extends BaseEntity {
	@Column({
		nullable: false
	})
	followerId: number;

	@Column({
		nullable: false
	})
	followedId: number;

	/************************* Relations *************************/

	@ManyToOne(() => UserEntity, user => user.followers, { onDelete: 'CASCADE' })
	follower: Promise<UserEntity>;

	@ManyToOne(() => UserEntity, user => user.followings, { onDelete: 'CASCADE' })
	followed: Promise<UserEntity>;

	/************************* Methods *************************/

	constructor(props?: Partial<UserFollowingEntity>) {
		super();
		Object.assign(this, props);
	}
}
