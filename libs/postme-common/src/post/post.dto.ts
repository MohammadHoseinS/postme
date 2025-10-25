import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class PostSubmitDto {
	@IsOptional()
	@IsNumber()
	@Min(1)
	id: number;

	@IsNotEmpty()
	@IsString()
	title: string;

	@IsOptional()
	@IsString()
	content?: string;
}
