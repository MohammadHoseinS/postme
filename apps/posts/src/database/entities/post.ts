import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base.entity";

@Entity('posts')
export class PostEntity extends BaseEntity {
	@Column({
		nullable: false
	})
	title: string;

	@Column({
		nullable: false,
		type: 'text'
	})
	content: string;

	@Column({
		nullable: false,
		default: false
	})
	published: boolean;

	@Column({
		nullable: true,
		default: null
	})
	publishedOn: Date;

	/************************* Methods *************************/

	constructor(props?: Partial<PostEntity>) {
		super();
		Object.assign(this, props);
	}
}