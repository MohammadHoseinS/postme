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
	@IsString()
	followerId: string;

	@IsNotEmpty()
	@IsString()
	@IsEmail()
	followingId: string;
}
