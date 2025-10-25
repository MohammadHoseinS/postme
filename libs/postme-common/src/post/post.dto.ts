import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PostSubmitDto {
	@IsNotEmpty()
	@IsString()
	title: string;

	@IsOptional()
	@IsString()
	content?: string;
}
