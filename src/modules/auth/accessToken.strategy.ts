import {
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

// - Repositories - //
import { UsersRepository } from './users.repository';

// - Interfaces - //
import { JwtPayload } from './interfaces/jwt-payload.interface';

// - Entities - //
import { User } from './entities/user.entity';

// - Models - //
import { EnvEnum } from 'src/shared/models/env';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersRepository: UsersRepository,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get(EnvEnum.jwtAccessTokenSecret),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayload): Promise<User> {
    Logger.log(JSON.stringify(payload));
    const { username } = payload;
    const user: User = await this.usersRepository.findOne(username);
    if (!user) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
    }
    return user;
  }
}
