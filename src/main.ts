import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TransformInterceptor } from './transform.interceptor';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('The Task management API')
    .setDescription('The Task management API')
    .setVersion('1.0')
    .addTag('tasks')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(configService.get('PORT'));
  logger.log('http://localhost:3000/api', 'OpenAPI docs');
}
bootstrap();
