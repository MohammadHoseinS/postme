import { Global, Module } from "@nestjs/common";
import { UserController } from "../../modules/users/user.controller";
import { UsersClientService } from "./users.service";

@Global()
@Module({
	providers: [UsersClientService],
	exports: [UsersClientService]
})
export class UsersClientModule {}