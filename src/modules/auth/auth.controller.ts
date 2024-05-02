import {
  Body,
  Controller,
  Post,
  Req,
  Request,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

// - DTOs - //
import { AuthCredentialsDto } from './dto/auth-credientials.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

// - Services - //
import { AuthService } from './auth.service';

// - Constants - //
import {
  API_PATH_AUTH_CREATE,
  API_PATH_AUTH_LOGIN,
  API_PATH_AUTH_REFRESH_TOKEN,
} from 'src/shared/constants/constant-path';

@Controller()
@ApiTags('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post(API_PATH_AUTH_CREATE)
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<any> {
    return this._authService.signUp(authCredentialsDto);
  }

  @Post(API_PATH_AUTH_LOGIN)
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<any> {
    return this._authService.signIn(authCredentialsDto);
  }
  @ApiBearerAuth('JWT-auth')
  @Post(API_PATH_AUTH_REFRESH_TOKEN)
  refreshToken(
    @Body(ValidationPipe) refreshTokenDto: RefreshTokenDto,
    @Req() request: Request,
  ): Promise<any> {
    return this._authService.refreshToken(refreshTokenDto, request);
  }
}
