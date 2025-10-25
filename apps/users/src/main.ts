import { NestFactory } from '@nestjs/core';
import { UsersAppModule } from './users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env') });

async function bootstrap() {
	const port = Number(process.env.USERS_SERVICE_PORT);
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(UsersAppModule, {
		transport: Transport.TCP,
		options: {
			port: port
		}
	});
	await app.listen();
}
bootstrap();
