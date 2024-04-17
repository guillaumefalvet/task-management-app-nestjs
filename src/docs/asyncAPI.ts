import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AsyncApiDocumentBuilder, AsyncApiModule } from 'nestjs-asyncapi';
import { apiDocsUrl } from '../shared/models/routes';
export class AsyncApiDocumentationBuilder {
  private _logger: Logger;
  private _httpProtocol: string;
  private _host: string;
  private _port: number;
  constructor(
    private _app: INestApplication,
    private _configService: ConfigService,
  ) {
    this._logger = new Logger(AsyncApiDocumentBuilder.name);
    this._host = _configService.get('HOST');
    this._port = _configService.get('PORT');
    this._httpProtocol = 'http://';
  }
  async createAsyncApiDocumentation(): Promise<void> {
    const document = AsyncApiModule.createDocument(
      this._app,
      new AsyncApiDocumentBuilder()
        .setTitle('The Task management API')
        .setDescription('WebSocket Documentation for task management')
        .setVersion('1.0')
        .setExternalDoc(
          'Find out about the REST API part of the API',
          `${this._httpProtocol}${this._host}:${this._port}/${apiDocsUrl.rest}`,
        )
        .setDefaultContentType('application/json')
        .addSecurity('user-password', { type: 'userPassword' })
        .addServer('task-management', {
          url: `ws://${this._host}:${this._port}`,
          protocol: 'socket.io',
        })
        .build(),
    );

    await AsyncApiModule.setup(apiDocsUrl.webSocket, this._app, document);
    this._logger.log(
      `${this._httpProtocol}${this._host}:${this._port}/${apiDocsUrl.webSocket}`,
    );
  }
}
