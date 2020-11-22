import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from 'app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);
  const host = configService.get<string>('host');
  const port = configService.get<string>('port');
  const nodeEnv = configService.get<string>('nodeEnv');

  await app.listen(port);

  logger.log(`App running in ${nodeEnv}-mode on ${host}:${port}`);
}
bootstrap();
