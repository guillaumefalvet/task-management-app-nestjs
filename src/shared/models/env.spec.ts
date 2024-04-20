import { EnvEnum } from './env';

describe('Env', () => {
  it('should have the correct values', () => {
    expect(EnvEnum.appStage).toBe('STAGE');
    expect(EnvEnum.appPort).toBe('PORT');
    expect(EnvEnum.appHost).toBe('HOST');
    expect(EnvEnum.dataBaseType).toBe('DB_TYPE');
    expect(EnvEnum.dataBaseHost).toBe('DB_HOST');
    expect(EnvEnum.dataBasePort).toBe('DB_PORT');
    expect(EnvEnum.dataBaseUsername).toBe('DB_USERNAME');
    expect(EnvEnum.dataBasePassword).toBe('DB_PASSWORD');
    expect(EnvEnum.database).toBe('DB_DATABASE');
    expect(EnvEnum.jwtAccessTokenSecret).toBe('JWT_ACCESS_SECRET');
    expect(EnvEnum.jwtRefreshTokenSecret).toBe('JWT_REFRESH_SECRET');
    expect(EnvEnum.jwtAccessTokenExpiration).toBe(
      'JWT_ACCESS_TOKEN_EXPIRATION',
    );
    expect(EnvEnum.jwtRefreshTokenExpiration).toBe(
      'JWT_REFRESH_TOKEN_EXPIRATION',
    );
  });
});
