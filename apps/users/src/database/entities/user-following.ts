import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { UserEntity } from './user';

@Index(['followerId', 'followingId'], { unique: true })
@Entity('userFollowings')
export class UserFollowingEntity extends BaseEntity {
	@Column({
		nullable: false
	})
	followerId: number;

	@Column({
		nullable: false
	})
	followingId: number;

	/************************* Relations *************************/

	@ManyToOne(() => UserEntity, user => user.followers, { onDelete: 'CASCADE' })
	follower: UserEntity;

	@ManyToOne(() => UserEntity, user => user.following, { onDelete: 'CASCADE' })
	following: UserEntity;

	/************************* Methods *************************/

	constructor(props?: Partial<UserFollowingEntity>) {
		super();
		Object.assign(this, props);
	}
}
