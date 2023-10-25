import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
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
    private readonly userEntityRepository: Repository<User>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}
  async findOne(username): Promise<User> {
    const found = await this.userEntityRepository.findOneBy({ username });
    return found;
  }
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<any> {
    const { username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userEntityRepository.create({
      username,
      password: hashedPassword,
      refreshToken: '',
    });
    try {
      await this.userEntityRepository.save(user);
      // gen token @ update refresh db
      const getTokens: JwtTokens = await this.generateJwtTokens(username);
      // return it
      return getTokens;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async updateRefreshToken(username, refreshToken: string): Promise<void> {
    const { id } = await this.findOne(username);
    await this.userEntityRepository.update(id, {
      refreshToken,
    });
  }

  async generateJwtTokens(username: string): Promise<JwtTokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(
        {
          username,
          type: 'access',
        },
        {
          secret: this.configService.get('JWT_ACCESS_SECRET'),
        },
      ),
      this.jwtService.signAsync(
        {
          username,
          type: 'refresh',
        },
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
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
    const verifyRefreshToken = await this.jwtService.decode(
      refreshToken,
      this.configService.get('JWT_REFRESH_SECRET'),
    );

    if (!verifyRefreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return verifyRefreshToken;
  }
  async verifyAccessToken(accessToken: string): Promise<JwtPayload> {
    return await this.jwtService.verify(accessToken, {
      ignoreExpiration: true,
      secret: this.configService.get('JWT_ACCESS_SECRET'),
    });
  }

  async getUserFromAccessToken(accessTokenPayload: JwtPayload): Promise<any> {
    const found = this.findOne(accessTokenPayload.username);
    if (!found) {
      throw new UnauthorizedException();
    }
    return found;
  }
}
