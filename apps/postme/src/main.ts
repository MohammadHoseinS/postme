import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { I18nMiddleware, I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { HttpExceptionFilter, HttpResponseInterceptor } from './common/http';
import { Logger } from '@nestjs/common';
import { resolve } from 'path';
import { config } from 'dotenv';

config({ path: resolve(process.cwd(), '.env') });

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// use i18n middleware
	app.use(I18nMiddleware);

  	// set global filters
	Logger.log(`Implement global custom http filters`);
	app.useGlobalFilters(
		new HttpExceptionFilter(),
		new I18nValidationExceptionFilter(), // optional — formats validation error payload
	);

 	// add global response interceptor
	Logger.log(`Implement http response interceptor`);
	app.useGlobalInterceptors(new HttpResponseInterceptor(new Reflector()));

	// global validation + i18n translation support for validator messages
	Logger.log(`global validation pipes + i18n translation support for validator messages`);
	app.useGlobalPipes(new I18nValidationPipe({
		transform: true,
		whitelist: true,
		forbidNonWhitelisted: false,
		validationError: { target: false, value: false },
	}));

	const port = parseInt(process.env.POSTME_PORT);
	console.log('port: ', port)
	await app.listen(port);
}
bootstrap();
