import { Env } from './env';

describe('Env', () => {
  it('should have the correct values', () => {
    expect(Env.appStage).toBe('STAGE');
    expect(Env.appPort).toBe('PORT');
    expect(Env.appHost).toBe('HOST');
    expect(Env.dataBaseType).toBe('DB_TYPE');
    expect(Env.dataBaseHost).toBe('DB_HOST');
    expect(Env.dataBasePort).toBe('DB_PORT');
    expect(Env.dataBaseUsername).toBe('DB_USERNAME');
    expect(Env.dataBasePassword).toBe('DB_PASSWORD');
    expect(Env.database).toBe('DB_DATABASE');
    expect(Env.jwtAccessTokenSecret).toBe('JWT_ACCESS_SECRET');
    expect(Env.jwtRefreshTokenSecret).toBe('JWT_REFRESH_SECRET');
    expect(Env.jwtAccessTokenExpiration).toBe('JWT_ACCESS_TOKEN_EXPIRATION');
    expect(Env.jwtRefreshTokenExpiration).toBe('JWT_REFRESH_TOKEN_EXPIRATION');
  });
});
