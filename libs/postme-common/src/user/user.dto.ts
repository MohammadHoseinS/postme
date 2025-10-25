import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class UserSubmitDto {
	@IsOptional()
	@IsNumber({}, { message: i18nValidationMessage('validation.isNotEmpty') })
	@Min(1, { message: i18nValidationMessage('validation.min', { min: 1 }) })
	id: number;

	@IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
	@IsString({ message: i18nValidationMessage('validation.isString') })
	name: string;

	@IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
	@IsString({ message: i18nValidationMessage('validation.isString') })
	@IsEmail({}, { message: i18nValidationMessage('validation.isEmail') })
	email: string;
}

export class UserFollowDto {
	@IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
	@IsNumber({}, { message: i18nValidationMessage('validation.isNotEmpty') })
	@Min(1, { message: i18nValidationMessage('validation.min', { min: 1 }) })
	followerId: number;

	@IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
	@IsNumber({}, { message: i18nValidationMessage('validation.isNotEmpty') })
	@Min(1, { message: i18nValidationMessage('validation.min', { min: 1 }) })
	followedId: number;
}
