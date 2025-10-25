import { Module } from "@nestjs/common";
import { UserFollowingController } from "./following.controller";
import { UserFollowingService } from "./following.service";

@Module({
	controllers: [UserFollowingController],
	providers: [UserFollowingService],
})
export class UserFollowingModule {}