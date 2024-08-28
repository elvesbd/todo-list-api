import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { setupApp } from '@config/setup-app';
import { setupDocs } from '@config/setup-docs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  const configService = app.get(ConfigService);

  setupApp(app);

  const isDevelopment = configService.get<string>('NODE_ENV') === 'development';
  if (isDevelopment) setupDocs(app);

  const port = configService.get<number>('APP_PORT') ?? 3000;

  await app.listen(port);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
