import { Expose, Type } from 'class-transformer';

export class User {
	@Expose()
	@Type(() => Number)
	id: number;

	@Expose()
	name: string;

	@Expose()
	email: string;

	/************************* methods *************************/

	constructor(props?: Partial<User>) {
		Object.assign(this, props);
	}
}
