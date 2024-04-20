import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

// - Models - //
import { EnvEnum } from 'src/shared/models/env';

export const jwtAsyncConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      secret: configService.get(EnvEnum.jwtAccessTokenSecret),
      signOptions: {
        expiresIn: configService.get(EnvEnum.jwtAccessTokenExpiration),
      },
    };
  },
};
