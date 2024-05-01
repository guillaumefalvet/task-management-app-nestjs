import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AsyncApiDocumentBuilder, AsyncApiModule } from 'nestjs-asyncapi';

// - Models - //
import { EnvEnum } from 'src/shared/models/env';

export class AsyncApiDocumentationBuilder {
  private _logger!: Logger;
  private readonly _HTTP_PROTOCOL!: string;
  private readonly _APP_HOST!: string;
  private readonly _APP_PORT!: number;

  constructor(private _app: INestApplication, configService: ConfigService) {
    this._logger = new Logger(AsyncApiDocumentBuilder.name);
    this._APP_HOST = configService.get(EnvEnum.appHost);
    this._APP_PORT = configService.get(EnvEnum.appPort);
    this._HTTP_PROTOCOL = configService.get(EnvEnum.appHttpProtocol);
  }

  async createAsyncApiDocumentation(): Promise<void> {
    const document = AsyncApiModule.createDocument(
      this._app,
      new AsyncApiDocumentBuilder()
        .setTitle('The Task management API')
        .setDescription('WebSocket Documentation for task management')
        .setVersion('1.0')
        .setDefaultContentType('application/json')
        .addSecurity('user-password', { type: 'userPassword' })
        .addServer('task-management', {
          url: `ws://${this._APP_HOST}:${this._APP_PORT}`,
          protocol: 'socket.io',
        })
        .build(),
    );

    await AsyncApiModule.setup('/docs/ws', this._app, document);
    this._logger.log(
      `${this._HTTP_PROTOCOL}://${this._APP_HOST}:${this._APP_PORT}/docs/ws`,
    );
  }
}
