import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UserSubmitDto {
	@IsOptional()
	@IsNumber()
	@Min(1)
	id: number;

	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsString()
	@IsEmail()
	email: string;
}

export class UserFollowDto {
	@IsNotEmpty()
	@IsNumber()
	@Min(1)
	followerId: number;

	@IsNotEmpty()
	@IsNumber()
	@Min(1)
	followedId: number;
}
