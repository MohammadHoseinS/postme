import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class PostCreateDto {
	@IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
	@IsNumber({}, { message: i18nValidationMessage('validation.isNotEmpty') })
	@Min(1, { message: i18nValidationMessage('validation.min', { min: 1 }) })
	createdBy: number;

	@IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
	@IsString({ message: i18nValidationMessage('validation.isString') })
	title: string;

	@IsOptional()
	@IsString({ message: i18nValidationMessage('validation.isString') })
	content: string;
}

export class PostUpdateDto {
	@IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
	@IsNumber({}, { message: i18nValidationMessage('validation.isNumber') })
	@Min(1, { message: i18nValidationMessage('validation.min', { min: 1 }) })
	id: number;

	@IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
	@IsString({ message: i18nValidationMessage('validation.isString') })
	title: string;

	@IsOptional()
	@IsString({ message: i18nValidationMessage('validation.isString') })
	content: string;
}

export class PostFilterDto {
	@IsOptional()
	@Transform(({ value }) => value?.trim())
	@IsString({ message: i18nValidationMessage('validation.isString') })
	title: string;

	@IsOptional()
	@Transform(({ value }) => Number(value))
	@IsNumber({}, { message: i18nValidationMessage('validation.isNumber') })
	@Min(1, { message: i18nValidationMessage('validation.min', { min: 1 }) })
	createdBy: number;
}
