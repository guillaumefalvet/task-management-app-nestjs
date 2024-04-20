import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

// - Models - //
import { EnvEnum } from 'src/shared/models/env';

export const jwtAsyncConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (env: ConfigService) => {
    return {
      secret: env.getOrThrow<string>(EnvEnum.jwtAccessTokenSecret),
      signOptions: {
        expiresIn: env.getOrThrow<string>(EnvEnum.jwtAccessTokenExpiration),
      },
    };
  },
};
