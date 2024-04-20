import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SwaggerTheme } from 'swagger-themes';

// - Models - //
import { Env } from 'src/shared/models/env';
import { apiDocsUrl } from 'src/shared/models/routes';

export class OpenAPIDocumentationBuilder {
  private _logger!: Logger;
  private readonly _HTTP_PROTOCOL!: string;
  private readonly _APP_HOST!: string;
  private readonly _APP_PORT!: number;
  constructor(private app: INestApplication, configService: ConfigService) {
    this._logger = new Logger(OpenAPIDocumentationBuilder.name);
    this._APP_HOST = configService.get(Env.appHost);
    this._APP_PORT = configService.get(Env.appPort);
    this._HTTP_PROTOCOL = configService.get(Env.appHttpProtocol);
  }
  createOpenApiDocumentation(): void {
    const document = SwaggerModule.createDocument(
      this.app,
      new DocumentBuilder()
        .setTitle('The Task management API')
        .setDescription('REST API Documentation for task management')
        .setVersion('1.0')
        .setExternalDoc(
          'Find out about the websocket part of the API',
          `${this._HTTP_PROTOCOL}://${this._APP_HOST}:${this._APP_PORT}/${apiDocsUrl.webSocket}`,
        )
        .addTag('tasks')
        .addTag('auth')
        .addBearerAuth(
          {
            type: 'http',
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
    SwaggerModule.setup(apiDocsUrl.rest, this.app, document, options);
    this._logger.log(
      `${this._HTTP_PROTOCOL}://${this._APP_HOST}:${this._APP_PORT}/${apiDocsUrl.rest}`,
    );
  }
}
