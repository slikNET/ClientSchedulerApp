import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { SwaggerHelper } from './common/helper/swagger.helper';
import { AppConfigService } from './config/app/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig: AppConfigService =
    app.get<AppConfigService>(AppConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Client Scheduler App')
    .setDescription('API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerHelper.setDefaultResponses(document);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000, () => {
    Logger.log(`http://${appConfig.app_host}:${appConfig.app_port}/api`, 'DOC');
  });
}
bootstrap();
