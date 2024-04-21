import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { DecodeOptions } from 'jsonwebtoken';

// - DTOs - //
import { AuthCredentialsDto } from './dto/auth-credientials.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

// - Entities - //
import { User } from './entities/user.entity';

// - Interfaces - //
import { JwtTokens } from './interfaces/jwt-tokens.interfance';
import { JwtPayload } from './interfaces/jwt-payload.interface';

// - Models - //
import { EnvEnum } from 'src/shared/models/env';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly _userEntityRepository: Repository<User>,
    private _env: ConfigService,
    private _jwtService: JwtService,
  ) {}
  /**
   * Registers a new user.
   * @param authCredentialsDto - The authentication credentials DTO.
   * @returns A promise resolving to JWT tokens upon successful registration.
   */
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<any> {
    return this._createUser(authCredentialsDto);
  }
  /**
   * Authenticates a user.
   * @param authCredentialsDto - The authentication credentials DTO.
   * @returns A promise resolving to JWT tokens upon successful authentication.
   * @throws `UnauthorizedException` if the provided credentials are invalid.
   */
  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<any> {
    const { username, password } = authCredentialsDto;
    const user = await this._userEntityRepository.findOneBy({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const getTokens = this._generateJwtTokens(username);
      return getTokens;
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
  /**
   * Refreshes the access token.
   * @param refreshTokenDto - The refresh token DTO.
   * @param request - The request object.
   * @returns A promise resolving to new JWT tokens upon successful token refresh.
   * @throws `UnauthorizedException` if the refresh token is invalid or missing.
   */
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
    await this._verifyRefreshToken(refreshToken);
    const verifyAccessToken = await this._verifyAccessToken(accessToken);
    const databaseUser = await this._getUserFromAccessToken(verifyAccessToken);

    if (refreshToken !== databaseUser.refreshToken) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid refresh token',
      });
    }
    return this._generateJwtTokens(verifyAccessToken.username);
  }

  /**
   * Creates a new user.
   * @param authCredentialsDto - The authentication credentials DTO.
   * @returns A promise resolving to JWT tokens upon successful user creation.
   * @throws `ConflictException` if the username already exists.
   * @throws `InternalServerErrorException` if an unexpected error occurs during user creation.
   */
  private async _createUser(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<any> {
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
      const getTokens: JwtTokens = await this._generateJwtTokens(username);
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
  // PRIVATE FUNCTIONS
  /**
   * Updates the refresh token for a user.
   * @param username - The username.
   * @param refreshToken - The new refresh token.
   * @returns A promise resolving void.
   */
  private async _updateRefreshToken(
    username,
    refreshToken: string,
  ): Promise<void> {
    const { id } = await this._userEntityRepository.findOneBy({ username });
    await this._userEntityRepository.update(id, {
      refreshToken,
    });
  }

  /**
   * Generates JWT tokens for a user.
   * @param username - The username.
   * @returns A promise resolving to JWT tokens.
   */
  private async _generateJwtTokens(username: string): Promise<JwtTokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this._jwtService.sign(
        {
          username,
          type: 'access',
        },
        {
          secret: this._env.getOrThrow<string>(EnvEnum.jwtAccessTokenSecret),
        },
      ),
      this._jwtService.signAsync(
        {
          username,
          type: 'refresh',
        },
        {
          secret: this._env.getOrThrow<string>(EnvEnum.jwtRefreshTokenSecret),
          expiresIn: this._env.getOrThrow<string>(
            EnvEnum.jwtRefreshTokenExpiration,
          ),
        },
      ),
    ]);
    this._updateRefreshToken(username, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }
  /**
   * Verifies the refresh token.
   * @param refreshToken - The refresh token.
   * @returns A promise resolving to the decoded refresh token payload.
   * @throws `UnauthorizedException` if the refresh token is invalid.
   */
  private async _verifyRefreshToken(refreshToken: string): Promise<any> {
    const verifyRefreshToken = this._jwtService.decode(
      refreshToken,
      this._env.getOrThrow<DecodeOptions>(EnvEnum.jwtRefreshTokenSecret),
    );

    if (!verifyRefreshToken) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid refresh token',
      });
    }

    return verifyRefreshToken;
  }
  /**
   * Verifies the access token.
   * @param accessToken - The access token.
   * @returns A promise resolving to the decoded access token payload.
   */
  private async _verifyAccessToken(accessToken: string): Promise<JwtPayload> {
    return await this._jwtService.verify(accessToken, {
      ignoreExpiration: true,
      secret: this._env.getOrThrow<string>(EnvEnum.jwtAccessTokenSecret),
    });
  }
  /**
   * Retrieves the user from the access token payload.
   * @param accessTokenPayload - The access token payload.
   * @returns A promise resolving to the user entity.
   * @throws `UnauthorizedException` if the user is not found.
   */
  private async _getUserFromAccessToken(
    accessTokenPayload: JwtPayload,
  ): Promise<any> {
    const found = this._userEntityRepository.findOneBy({
      username: accessTokenPayload.username,
    });
    if (!found) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'User not found',
      });
    }
    return found;
  }
}
