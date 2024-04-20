import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// - Interceptors - //
import { TransformInterceptor } from './transform.interceptor';

// - Documentation - //
import { OpenAPIDocumentationBuilder } from './docs/openAPI';
import { AsyncApiDocumentationBuilder } from './docs/asyncAPI';

// - Models - //
import { Env } from './shared/models/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');
  const configService = app.get<ConfigService>(ConfigService);

  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  });

  // Create OpenAPI documentation
  const openApiDocs = new OpenAPIDocumentationBuilder(app, configService);
  openApiDocs.createOpenApiDocumentation();

  // Create AsyncAPI documentation
  const AsyncApiDocs = new AsyncApiDocumentationBuilder(app, configService);
  await AsyncApiDocs.createAsyncApiDocumentation();

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  switch (process.env.STAGE) {
    case 'dev':
      logger.log('DEVELOPMENT MODE');
      break;
    case 'prod':
      logger.log('PRODUCTION MODE');
      break;
  }

  await app.listen(configService.get(Env.appPort), () => {
    logger.log(
      `Application is running on: http://${configService.get(
        Env.appHost,
      )}:${configService.get(Env.appPort)}`,
    );
  });
}
bootstrap();
