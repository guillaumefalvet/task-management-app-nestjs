import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const jwtAsyncConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      secret: configService.get('JWT_ACCESS_SECRET'),
      signOptions: {
        expiresIn: configService.get('JWT_ACCESS_TOKEN_EXPIRATION'),
      },
    };
  },
};
