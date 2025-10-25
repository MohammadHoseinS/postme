import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class PostCreateDto {
	@IsNotEmpty()
	@IsNumber()
	@Min(1)
	createdBy: number;

	@IsNotEmpty()
	@IsString()
	title: string;

	@IsOptional()
	@IsString()
	content: string;
}

export class PostUpdateDto {
	@IsNotEmpty()
	@IsNumber()
	@Min(1)
	id: number;

	@IsNotEmpty()
	@IsString()
	title: string;

	@IsOptional()
	@IsString()
	content: string;
}

export class PostFilterDto {
	@IsOptional()
	@Transform(({ value }) => value?.trim())
	@IsString()
	title: string;

	@IsOptional()
	@IsNumber()
	@Min(1)
	createdBy: number;
}
