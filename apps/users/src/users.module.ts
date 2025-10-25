import { Module } from '@nestjs/common';
import { UsersAppController } from './users.controller';
import { UsersAppService } from './users.service';

@Module({
  imports: [],
  controllers: [UsersAppController],
  providers: [UsersAppService],
})
export class UsersAppModule {}
