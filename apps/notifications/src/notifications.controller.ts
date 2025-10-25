import { Controller, Get } from '@nestjs/common';
import { NotificationsAppService } from './notifications.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class NotificationsAppController {
	constructor(private readonly notificationsService: NotificationsAppService) {}

	@MessagePattern('notifications.healthcheck')
	healthcheck(): string {
		return this.notificationsService.getHello();
	}
}
