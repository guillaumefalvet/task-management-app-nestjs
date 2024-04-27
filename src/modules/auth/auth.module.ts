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
import { WsJwtStrategy } from './webSocket.strategy';

// - Configs - //
import { jwtAsyncConfig } from 'src/config/jwt.config';

// - Gateways - //
import { AuthGateway } from './auth.gateway';

// - Guards - //
import { WsAuthGuard } from './ws-auth.guard';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(jwtAsyncConfig),
  ],
  providers: [
    AuthService,
    AccessTokenStrategy,
    AuthGateway,
    WsJwtStrategy,
    WsAuthGuard,
  ],
  controllers: [AuthController],
  exports: [AccessTokenStrategy, PassportModule, WsAuthGuard, TypeOrmModule],
})
export class AuthModule {}
