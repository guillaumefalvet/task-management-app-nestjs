import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credientials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { JwtTokens } from './interfaces/jwt-tokens.interfance';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { User } from './entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<any> {
    return this.usersRepository.createUser(authCredentialsDto);
  }
  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<any> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const getTokens = this.usersRepository.generateJwtTokens(username);
      return getTokens;
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
    request: Request,
  ): Promise<any> {
    const { refreshToken } = refreshTokenDto;

    const accessToken = request.headers['authorization'].split('Bearer ')[1];
    // Decode and verify the refresh token
    const verifyRefreshToken = await this.usersRepository.verifyRefreshToken(
      refreshToken,
    );
    Logger.log(JSON.stringify(verifyRefreshToken), 'refreshtoken decoded');

    // Verify the access token
    const verifyAccessToken = await this.usersRepository.verifyAccessToken(
      accessToken,
    );
    Logger.log(JSON.stringify(verifyAccessToken), 'accesstoken verify');

    // Get the user from the database
    const databaseUser = await this.usersRepository.getUserFromAccessToken(
      verifyAccessToken,
    );

    if (refreshToken !== databaseUser.refreshToken) {
      throw new UnauthorizedException('Refresh token mismatch');
    }

    return this.usersRepository.generateJwtTokens(verifyAccessToken.username);
  }
}
