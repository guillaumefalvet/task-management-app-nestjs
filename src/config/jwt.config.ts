import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Env } from '../shared/models/env';

export const jwtAsyncConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      secret: configService.get(Env.jwtAccessTokenSecret),
      signOptions: {
        expiresIn: configService.get(Env.jwtAccessTokenExpiration),
      },
    };
  },
};
