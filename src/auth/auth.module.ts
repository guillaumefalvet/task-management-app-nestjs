import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './accessToken.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
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
    }),
  ],
  providers: [AuthService, UsersRepository, AccessTokenStrategy],
  controllers: [AuthController],
  exports: [AccessTokenStrategy, PassportModule],
})
export class AuthModule {}
