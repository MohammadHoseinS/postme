import { Expose, Type } from 'class-transformer';

export class Post {
	@Expose()
	@Type(() => Number)
	id: number;

	@Expose()
	title: string;

	@Expose()
	content: string;

	@Expose()
	@Type(() => Number)
	createdById: number;

	@Expose()
	@Type(() => Date)
	createdOn: Date;

	@Expose()
	createdByName: string;

	@Expose()
	@Type(() => Boolean)
	published: boolean;

	@Expose()
	@Type(() => Date)
	publishedOn: Date;

	/************************* methods *************************/

	constructor(props?: Partial<Post>) {
		Object.assign(this, props);
	}
}
