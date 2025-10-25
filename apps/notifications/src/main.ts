import { NestFactory } from '@nestjs/core';
import { NotificationsAppModule } from './notifications.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env') });

async function bootstrap() {
	const port = Number(process.env.NOTIFICATIONS_SERVICE_PORT);
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(NotificationsAppModule, {
		// in real application, it's better to user a message broker like RabbitMQ
		transport: Transport.TCP,
		options: {
			port: port
		}
	});
	await app.listen();
}
bootstrap();
