import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SwaggerTheme } from 'swagger-themes';

// - Models - //
import { EnvEnum } from 'src/shared/models/env';
import { API_PATH_DOCS } from 'src/shared/constants/constant-path';

export class OpenAPIDocumentationBuilder {
  private _logger!: Logger;
  private readonly _HTTP_PROTOCOL!: string;
  private readonly _APP_HOST!: string;
  private readonly _APP_PORT!: number;

  constructor(private app: INestApplication, configService: ConfigService) {
    this._logger = new Logger(OpenAPIDocumentationBuilder.name);
    this._APP_HOST = configService.get(EnvEnum.appHost);
    this._APP_PORT = configService.get(EnvEnum.appPort);
    this._HTTP_PROTOCOL = configService.get(EnvEnum.appHttpProtocol);
  }

  createOpenApiDocumentation(): void {
    const document = SwaggerModule.createDocument(
      this.app,
      new DocumentBuilder()
        .setTitle('The Task management API')
        .setDescription('REST API Documentation for task management')
        .setVersion('1.0')
        .addTag('auth')
        .addTag('tasks')
        .addBearerAuth(
          {
            type: this._HTTP_PROTOCOL as any,
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT',
            description: 'Enter JWT token',
            in: 'header',
          },
          'JWT-auth',
        )
        .build(),
    );
    const theme = new SwaggerTheme('v3');
    const options = {
      explorer: true,
      customCss: theme.getBuffer('dark'),
    };
    SwaggerModule.setup(API_PATH_DOCS, this.app, document, options);
    this._logger.log(
      `${this._HTTP_PROTOCOL}://${this._APP_HOST}:${this._APP_PORT}${API_PATH_DOCS}`,
    );
  }
}
