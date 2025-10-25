import { Controller, Get } from '@nestjs/common';
import { UsersAppService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UsersAppController {
	constructor(private readonly usersService: UsersAppService) {}

	@MessagePattern('users.healthcheck')
	healthcheck(): string {
		return this.usersService.getHello();
	}
}
