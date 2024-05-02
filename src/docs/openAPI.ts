import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
// - Models - //
import { EnvEnum } from 'src/shared/models/env';

// - Constants - //
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
    const theme = new SwaggerTheme();
    const options = {
      explorer: true,
      customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
      swaggerOptions: {
        plugins: [this._useSwaggerUIAuthStoragePlugin()],
      },
    };
    SwaggerModule.setup(API_PATH_DOCS, this.app, document, options);
    this._logger.log(
      `${this._HTTP_PROTOCOL}://${this._APP_HOST}:${this._APP_PORT}${API_PATH_DOCS}`,
    );
  }
  private _useSwaggerUIAuthStoragePlugin() {
    /* eslint-disable */
    // prettier-ignore
    const afterLoad = function(ui) {
      // NOTE: Code inside this afterLoad function will run in the browser!
      //
      // **Therefore, you cannot use an closure variables in here!**
      // Also you should follow ES5 coding style.
      //
      // See: https://github.com/scottie1984/swagger-ui-express/blob/master/index.js#L239
      //
      // Other Notes:
      // See https://github.com/scottie1984/swagger-ui-express/issues/44
      // See https://github.com/swagger-api/swagger-ui/blob/master/src/core/system.js#L344
      // See https://github.com/swagger-api/swagger-ui/issues/2915#issuecomment-297405865
      var AUTH_SCHEME = "JWT-auth";
      var currentAuthToken = undefined;

      setTimeout(function() {
        // Restore auth token from localStorage, if any.
        var token = localStorage.getItem(AUTH_SCHEME);
        if (token) {
          function isTokenExpired(token: string): boolean {
            const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
            return (Math.floor((new Date()).getTime() / 1000)) >= expiry;
          }
          if (isTokenExpired(token)) {
            localStorage.removeItem(AUTH_SCHEME);
            console.log("Token expired. Removed from localStorage.");
            return;
          }
          setAuthToken(token);
          console.log("Restored " + AUTH_SCHEME + " token from localStorage.");
        }
        // Start polling ui.getState() to see if the user changed tokens.
        setTimeout(checkForNewLogin, 3000);
      }, 1000);

      function checkForNewLogin() {
        var stateToken = getAuthTokenFromState();
        if (stateToken !== currentAuthToken) {
          console.log("Saved " + AUTH_SCHEME + " token to localStorage.");
          if (stateToken) {
            localStorage.setItem(AUTH_SCHEME, stateToken);
          } else {
            localStorage.removeItem(AUTH_SCHEME);
          }
          currentAuthToken = stateToken;
        }
        // Continue checking every second...
        setTimeout(checkForNewLogin, 1000);
      }

      function getAuthTokenFromState() {
        var state = ui.getState();
        ui
        // Get token from state "auth.authorized[AUTH_SCHEME].value"
        return getUIStateEntry(
          getUIStateEntry(
            getUIStateEntry(getUIStateEntry(state, "auth"), "authorized"),
            AUTH_SCHEME
          ),
          "value"
        );
      }

      function getUIStateEntry(state, name) {
        if (state && state._root && Array.isArray(state._root.entries)) {
          var entry = state._root.entries.find(e => e && e[0] === name);
          return entry ? entry[1] : undefined;
        }
        return undefined;
      }

      function setAuthToken(token) {
        var authorization = {};
        authorization[AUTH_SCHEME] = {
          name: AUTH_SCHEME,
          schema: {
            type: "apiKey",
            in: "header",
            name: "Authorization",
            description: "",
          },
          value: token,
        };
        var result = ui.authActions.authorize(authorization);
        currentAuthToken = token;
        return result;
      }
    };
    /* eslint-enable */
    return {
      afterLoad,
    };
  }
}
