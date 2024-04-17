import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';
import { ConfigService } from '@nestjs/config';
import { OpenAPIDocumentationBuilder } from './docs/openAPI';
import { AsyncApiDocumentationBuilder } from './docs/asyncAPI';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');
  const configService = app.get<ConfigService>(ConfigService);

  app.enableCors();

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
      logger.log('DEVELOPMENT MODE', 'environment');
      break;
    case 'prod':
      logger.log('PRODUCTION MODE', 'environment');
      break;
  }

  await app.listen(configService.get('PORT'));
}
bootstrap();
