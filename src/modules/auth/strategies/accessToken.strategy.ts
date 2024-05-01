import {
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

// - Interfaces - //
import { JwtPayload } from '../interfaces/jwt-payload.interface';

// - Entities - //
import { User } from '../entities/user.entity';

// - Models - //
import { EnvEnum } from 'src/shared/models/env';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly _userEntityRepository: Repository<User>,
    env: ConfigService,
  ) {
    super({
      secretOrKey: env.getOrThrow<string>(EnvEnum.jwtAccessTokenSecret),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  /**
   * Validates the JWT payload present in the access token header.
   * @param payload - The JWT payload to validate.
   * @returns A promise resolving to the user associated with the JWT payload.
   * @throws `UnauthorizedException` if the user is not found.
   */
  async validate(payload: JwtPayload): Promise<User> {
    Logger.log(JSON.stringify(payload));
    const { username } = payload;
    const user: User = await this._userEntityRepository.findOneBy({ username });
    if (!user) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
    }
    return user;
  }
}
