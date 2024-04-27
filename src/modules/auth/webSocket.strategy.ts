import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';

import { WsException } from '@nestjs/websockets';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class WsJwtStrategy extends PassportStrategy(Strategy, 'wsjwt') {
  constructor(
    @InjectRepository(User)
    private _userEntityRepository: Repository<User>,
  ) {
    super({
      secretOrKey: 'asasas',
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('bearerToken'),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    try {
      return this._userEntityRepository.findOneBy({ username });
    } catch (error) {
      throw new WsException('Unauthorized access');
    }
  }
}
