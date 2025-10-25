import { Module } from '@nestjs/common';
import { UsersAppController } from './users.controller';
import { UsersAppService } from './users.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { UserFollowingModule } from './modules/following/following.module';

@Module({
	imports: [
    DatabaseModule,
    UserModule,
    UserFollowingModule
  ],
	controllers: [UsersAppController],
	providers: [UsersAppService]
})
export class UsersAppModule {}
