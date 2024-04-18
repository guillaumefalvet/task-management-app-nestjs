import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Env } from '../shared/models/env';
import { apiDocsUrl } from 'src/shared/models/routes';
import { SwaggerTheme } from 'swagger-themes';

export class OpenAPIDocumentationBuilder {
  private _logger: Logger;
  private _httpProtocol: string;
  private _host: string;
  private _port: number;
  constructor(
    private app: INestApplication,
    private _configService: ConfigService,
  ) {
    this._logger = new Logger(OpenAPIDocumentationBuilder.name);
    this._host = _configService.get(Env.appHost);
    this._port = _configService.get(Env.appPort);
    this._httpProtocol = 'http://';
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
          `${this._httpProtocol}${this._host}:${this._port}/${apiDocsUrl.webSocket}`,
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
      `${this._httpProtocol}${this._host}:${this._port}/${apiDocsUrl.rest}`,
    );
  }
}
