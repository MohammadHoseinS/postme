import { Module } from '@nestjs/common';
import { UsersAppController } from './users.controller';
import { UsersAppService } from './users.service';
import { DatabaseModule } from './database/database.module';

@Module({
	imports: [DatabaseModule],
	controllers: [UsersAppController],
	providers: [UsersAppService]
})
export class UsersAppModule {}
