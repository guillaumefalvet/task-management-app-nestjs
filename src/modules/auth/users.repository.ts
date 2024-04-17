import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthCredentialsDto } from './dto/auth-credientials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtTokens } from './interfaces/jwt-tokens.interfance';
import { JwtPayload } from './interfaces/jwt-payload.interface';
@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly _userEntityRepository: Repository<User>,
    private _configService: ConfigService,
    private _jwtService: JwtService,
  ) {}
  async findOne(username): Promise<User> {
    const found = await this._userEntityRepository.findOneBy({ username });
    return found;
  }
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<any> {
    const { username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this._userEntityRepository.create({
      username,
      password: hashedPassword,
      refreshToken: '',
    });
    try {
      await this._userEntityRepository.save(user);
      // gen token @ update refresh db
      const getTokens: JwtTokens = await this.generateJwtTokens(username);
      // return it
      return getTokens;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException({
          statusCode: HttpStatus.CONFLICT,
          message: 'Username already exists',
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Something went wrong',
        });
      }
    }
  }
  async updateRefreshToken(username, refreshToken: string): Promise<void> {
    const { id } = await this.findOne(username);
    await this._userEntityRepository.update(id, {
      refreshToken,
    });
  }

  async generateJwtTokens(username: string): Promise<JwtTokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this._jwtService.sign(
        {
          username,
          type: 'access',
        },
        {
          secret: this._configService.get('JWT_ACCESS_SECRET'),
        },
      ),
      this._jwtService.signAsync(
        {
          username,
          type: 'refresh',
        },
        {
          secret: this._configService.get('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);
    this.updateRefreshToken(username, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }
  async verifyRefreshToken(refreshToken: string): Promise<any> {
    const verifyRefreshToken = await this._jwtService.decode(
      refreshToken,
      this._configService.get('JWT_REFRESH_SECRET'),
    );

    if (!verifyRefreshToken) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid refresh token',
      });
    }

    return verifyRefreshToken;
  }
  async verifyAccessToken(accessToken: string): Promise<JwtPayload> {
    return await this._jwtService.verify(accessToken, {
      ignoreExpiration: true,
      secret: this._configService.get('JWT_ACCESS_SECRET'),
    });
  }

  async getUserFromAccessToken(accessTokenPayload: JwtPayload): Promise<any> {
    const found = this.findOne(accessTokenPayload.username);
    if (!found) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'User not found',
      });
    }
    return found;
  }
}
