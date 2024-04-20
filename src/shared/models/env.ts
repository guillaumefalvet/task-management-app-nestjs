export enum Env {
  appStage = 'STAGE',
  appPort = 'PORT',
  appHost = 'HOST',
  appHttpProtocol = 'HTTP_PROTOCOL',
  // TODO: add in the env file
  dataBaseType = 'postgres',
  // TODO: END
  dataBaseHost = 'DB_HOST',
  dataBasePort = 'DB_PORT',
  dataBaseUsername = 'DB_USERNAME',
  dataBasePassword = 'DB_PASSWORD',
  database = 'DB_DATABASE',
  jwtAccessTokenSecret = 'JWT_ACCESS_SECRET',
  jwtRefreshTokenSecret = 'JWT_REFRESH_SECRET',
  jwtAccessTokenExpiration = 'JWT_ACCESS_TOKEN_EXPIRATION',
  jwtRefreshTokenExpiration = 'JWT_REFRESH_TOKEN_EXPIRATION',
}
