import { OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { firstValueFrom, Observable } from "rxjs";

export abstract class BaseMicroserviceClient implements OnModuleInit, OnModuleDestroy {
	protected client: ClientProxy;

	constructor(host: string, port: number) {
		this.client = ClientProxyFactory.create({
			// in a real application, we might have microservices each using different transport mechanisms
			// like RabbitMQ, Kafka, etc. Here, for simplicity, we use TCP transport by default for all microservices
			// in other cases, we can extend this class to accept transport type and options as parameters
			transport: Transport.TCP,
			options: { host, port },
		});
	}

	/**
	 * Sends a message to the microservice configured in the constructor, using TCP transport
	 * @param pattern — Pattern to identify the message
	 * @param data - Data to be sent
	 * @returns first value of the response Observable from the microservice (using rxjs's firstValueFrom)
	 */
	protected async send<T>(pattern: any, data: any): Promise<T> {
		return firstValueFrom(this.client.send(pattern, data));
	}

	/**
	 * Emits an event to the microservice configured in the constructor, using TCP transport
	 * @param pattern — Pattern to identify the event
	 * @param data - Data to be sent
	 * @returns Observable of the emission response from the microservice
	 */
	protected emit(pattern: any, data: any): Observable<any> {
		return this.client.emit(pattern, data);
	}

	async onModuleInit() {
		// the client created in the constructor will connect automatically on first use
		// but the cleaner approach is to open and close the connection explicitly
		// specially for closing it on module destroy
		// if there is no need, we can remove implementing OnModuleInit and OnModuleDestroy
		await this.client.connect();
	}

	async onModuleDestroy() {
		// close the client connection when the module is destroyed
		// close explicitly to free up resources
		// and clean shutdown of the application
		await this.client.close();
	}
}