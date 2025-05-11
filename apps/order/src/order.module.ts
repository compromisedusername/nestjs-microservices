import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { ClientsModule } from "@nestjs/microservices";
import { Transport } from "@nestjs/microservices";
import { PORTS } from "@app/constants/ports";
import { SERVICES } from "@app/constants/services";

@Module({
	imports: [
		ClientsModule.register([
			{
			  name: SERVICES.INVENTORY_SERVICE,
			  transport: Transport.TCP,
				options: { port: PORTS.TRANSPORT_TCP_PORT },
			},
		]),
	],
	controllers: [OrderController],
	providers: [OrderService],
})
export class OrderModule {}
