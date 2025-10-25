import { Controller, Get } from '@nestjs/common';
import { NotificationsAppService } from './notifications.service';

@Controller()
export class NotificationsAppController {
  constructor(private readonly notificationsService: NotificationsAppService) {}

  @Get()
  getHello(): string {
    return this.notificationsService.getHello();
  }
}
