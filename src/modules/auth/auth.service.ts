import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// - Repositories - //
import { UsersRepository } from './users.repository';

// - DTOs - //
import { AuthCredentialsDto } from './dto/auth-credientials.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(private _usersRepository: UsersRepository) {}
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<any> {
    return this._usersRepository.createUser(authCredentialsDto);
  }
  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<any> {
    const { username, password } = authCredentialsDto;
    const user = await this._usersRepository.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const getTokens = this._usersRepository.generateJwtTokens(username);
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
    if (!request.headers || !request.headers['authorization']) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Authorization header is missing',
      });
    }
    const accessToken = request.headers['authorization'].split('Bearer ')[1];
    await this._usersRepository.verifyRefreshToken(refreshToken);
    const verifyAccessToken = await this._usersRepository.verifyAccessToken(
      accessToken,
    );
    const databaseUser = await this._usersRepository.getUserFromAccessToken(
      verifyAccessToken,
    );

    if (refreshToken !== databaseUser.refreshToken) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid refresh token',
      });
    }
    return this._usersRepository.generateJwtTokens(verifyAccessToken.username);
  }
}
