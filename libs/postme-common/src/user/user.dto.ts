import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserInformationDto {
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
