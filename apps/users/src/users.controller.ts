import { Controller, Get } from '@nestjs/common';
import { UsersAppService } from './users.service';

@Controller()
export class UsersAppController {
  constructor(private readonly usersService: UsersAppService) {}

  @Get()
  getHello(): string {
    return this.usersService.getHello();
  }
}
