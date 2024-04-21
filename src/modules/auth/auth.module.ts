import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

// - Entities - //
import { User } from './entities/user.entity';

// - Controllers - //
import { AuthController } from './auth.controller';

// - Services - //
import { AuthService } from './auth.service';

// - Strategies - //
import { AccessTokenStrategy } from './accessToken.strategy';

// - Configs - //
import { jwtAsyncConfig } from 'src/config/jwt.config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(jwtAsyncConfig),
  ],
  providers: [AuthService, AccessTokenStrategy],
  controllers: [AuthController],
  exports: [AccessTokenStrategy, PassportModule],
})
export class AuthModule {}
