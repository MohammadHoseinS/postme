import { Global, Module } from "@nestjs/common";
import { NotificationsClientService } from "./notifications.service";

@Global()
@Module({
	providers: [NotificationsClientService],
	exports: [NotificationsClientService]
})
export class NotificationsClientModule {}