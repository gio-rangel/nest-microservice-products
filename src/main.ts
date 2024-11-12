import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger(`Bootstrap MS Product`);

  const port = Number(process.env.PORT) || 3002;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      port: port
    }
  })

  logger.debug(`App runnig on ${port}`);

  await app.listen();
}
bootstrap();
